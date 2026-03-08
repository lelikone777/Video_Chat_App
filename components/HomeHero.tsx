"use client";

import { useMemo } from "react";

import { useGetCalls } from "@/hooks/useGetCalls";

const HomeHero = () => {
  const { upcomingCalls } = useGetCalls();
  const now = new Date();

  const time = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("ru-RU", { dateStyle: "full" }).format(
    now,
  );

  const nearestUpcomingCall = useMemo(() => {
    if (!upcomingCalls || upcomingCalls.length === 0) return null;

    return [...upcomingCalls].sort((a, b) => {
      const aStart = a.state.startsAt?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const bStart = b.state.startsAt?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return aStart - bStart;
    })[0];
  }, [upcomingCalls]);

  const nearestMeetingText = nearestUpcomingCall?.state.startsAt
    ? `Ближайшая встреча: ${nearestUpcomingCall.state.startsAt.toLocaleString(
        "ru-RU",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      )}`
    : "встреч не запланировано";

  return (
    <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
      <div className="flex h-full flex-col justify-between px-5 py-8 lg:p-11">
        <h2 className="glassmorphism max-w-[330px] rounded py-2 text-center text-base font-normal">
          {nearestMeetingText}
        </h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
          <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
