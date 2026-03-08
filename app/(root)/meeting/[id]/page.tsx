"use client";

import { useState } from "react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

import { useGetCallById } from "@/hooks/useGetCallById";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { useAppUser } from "@/hooks/useAppUser";

const MeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoaded, user } = useAppUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!user)
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4 text-white">
        <p className="text-center text-xl font-semibold">
          Для участия в видеозвонке нужно войти в аккаунт.
        </p>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </div>
      </main>
    );

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
