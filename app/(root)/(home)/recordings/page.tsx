import type { Metadata } from "next";
import CallList from "@/components/CallList";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Recordings",
  description: "Access recorded WaveMeet meetings from your library.",
  path: "/recordings",
});

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* <h1 className="text-3xl font-bold">Recordings</h1> */}
      <h1 className="text-3xl font-bold">Записи Звонков</h1>

      <CallList type="recordings" />
    </section>
  );
};

export default PreviousPage;
