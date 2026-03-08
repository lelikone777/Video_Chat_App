"use client";
import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import Alert from "./Alert";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component.",
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const [deviceError, setDeviceError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const configureDevices = async () => {
      try {
        setDeviceError(null);

        if (isMicCamToggled) {
          await call.camera.disable();
          await call.microphone.disable();
          return;
        }

        await call.camera.enable();
        await call.microphone.enable();
      } catch (error) {
        if (isCancelled) return;
        setDeviceError(
          "Камера или микрофон не найдены. Проверьте подключение устройств или войдите с выключенными устройствами.",
        );
      }
    };

    void configureDevices();

    return () => {
      isCancelled = true;
    };
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        // title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
        title={`Ваше Звонок еще не начался. Он запланирован на ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        // title="The call has been ended by the host"
        title="Звонок завершен Администратором"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      {deviceError ? (
        <p className="max-w-xl text-center text-sm text-amber-300">
          {deviceError}
        </p>
      ) : null}
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          {/* Join with mic and camera off */}
          присоединиться без камеры и микрофона
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={async () => {
          try {
            await call.join();
            setIsSetupComplete(true);
          } catch (error) {
            setDeviceError(
              "Не удалось присоединиться к звонку. Проверьте разрешения браузера для камеры и микрофона.",
            );
          }
        }}
      >
        {/* Join meeting */}
        Присоединиться
      </Button>
    </div>
  );
};

export default MeetingSetup;
