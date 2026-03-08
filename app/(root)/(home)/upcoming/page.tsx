import type { Metadata } from "next";
import CallList from "@/components/CallList";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Upcoming Meetings",
  description: "View and manage your scheduled WaveMeet calls.",
  path: "/upcoming",
});

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* <h1 className="text-3xl font-bold">Upcoming Meeting</h1> */}
      <h1 className="text-3xl font-bold">Запланированное встречи</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;
