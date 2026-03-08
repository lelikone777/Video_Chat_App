"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useAppUser } from "@/hooks/useAppUser";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const clientRef = useRef<StreamVideoClient>();
  const { user, isLoaded } = useAppUser();

  useEffect(() => {
    const disconnectClient = async (client?: StreamVideoClient) => {
      if (!client) return;

      try {
        await client.disconnectUser();
      } catch (error) {
        console.error("Failed to disconnect Stream client", error);
      }
    };

    if (!isLoaded || !API_KEY) return;

    if (!user) {
      void disconnectClient(clientRef.current);
      clientRef.current = undefined;
      setVideoClient(undefined);
      return;
    }

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider,
    });

    const previousClient = clientRef.current;
    clientRef.current = client;
    setVideoClient(client);
    void disconnectClient(previousClient);

    return () => {
      if (clientRef.current === client) {
        void disconnectClient(client);
        clientRef.current = undefined;
      }
    };
  }, [isLoaded, user?.id, user?.username, user?.imageUrl]);

  if (!isLoaded) return <Loader />;
  if (!API_KEY) return <>{children}</>;
  if (!user) return <>{children}</>;
  if (!videoClient) return <Loader />;

  return (
    <StreamVideo key={user.id} client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
