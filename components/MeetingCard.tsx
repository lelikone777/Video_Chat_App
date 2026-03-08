"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type MeetingParticipant = {
  id: string;
  name: string;
  image?: string;
};

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  participants?: MeetingParticipant[];
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  participants = [],
}: MeetingCardProps) => {
  const { toast } = useToast();
  const visibleParticipants = participants.slice(0, 5);
  const hiddenParticipantsCount =
    participants.length > visibleParticipants.length
      ? participants.length - visibleParticipants.length
      : 0;

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        {visibleParticipants.length > 0 ? (
          <div className="relative flex w-full max-sm:hidden">
            {visibleParticipants.map((participant, index) => (
              <div
                key={participant.id}
                className={cn(
                  "flex size-10 items-center justify-center overflow-hidden rounded-full border-[2px] border-dark-3 bg-dark-4",
                  { absolute: index > 0 },
                )}
                style={{ top: 0, left: index * 28 }}
                title={participant.name || participant.id}
              >
                {participant.image ? (
                  <img
                    src={participant.image}
                    alt={participant.name || participant.id}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-white">
                    {(participant.name || participant.id)
                      .slice(0, 1)
                      .toUpperCase()}
                  </span>
                )}
              </div>
            ))}
            {hiddenParticipantsCount > 0 ? (
              <div
                className="flex-center absolute size-10 rounded-full border-[5px] border-dark-3 bg-dark-4 text-sm font-semibold"
                style={{ top: 0, left: visibleParticipants.length * 28 }}
              >
                +{hiddenParticipantsCount}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="w-full max-sm:hidden" />
        )}
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
