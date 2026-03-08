"use client";

type HistoryParticipant = {
  id: string;
  name: string;
  image?: string;
};

type HistoryCallCardProps = {
  title: string;
  callId: string;
  startedAt?: Date;
  endedAt?: Date;
  participants: HistoryParticipant[];
};

const formatDateTime = (date?: Date) => {
  if (!date) return "Unknown time";
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDuration = (startedAt?: Date, endedAt?: Date) => {
  if (!startedAt || !endedAt) return "Unknown";

  const durationMs = endedAt.getTime() - startedAt.getTime();
  if (durationMs <= 0) return "Unknown";

  const totalMinutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  return `${hours} h ${minutes} min`;
};

const HistoryCallCard = ({
  title,
  callId,
  startedAt,
  endedAt,
  participants,
}: HistoryCallCardProps) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-sky-2">Call ID: {callId}</p>
        <p className="text-base text-white/90">Started: {formatDateTime(startedAt)}</p>
        <p className="text-base text-white/90">Ended: {formatDateTime(endedAt)}</p>
        <p className="text-base font-semibold text-green-300">
          Duration: {formatDuration(startedAt, endedAt)}
        </p>
      </article>

      <article className="mt-5">
        <p className="mb-3 text-sm font-semibold text-sky-2">
          Participants ({participants.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {participants.length > 0 ? (
            participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-2 rounded-full bg-dark-4 px-3 py-1.5"
              >
                {participant.image ? (
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-1 text-xs font-bold">
                    {(participant.name || participant.id).slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="max-w-[180px] truncate text-sm">
                  {participant.name || participant.id}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-sky-2">No participants data.</p>
          )}
        </div>
      </article>
    </section>
  );
};

export default HistoryCallCard;
