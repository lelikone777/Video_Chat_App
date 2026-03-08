import type { Metadata } from "next";
import CallList from "@/components/CallList";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Previous Calls",
  description: "Browse your past WaveMeet call history.",
  path: "/previous",
});

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* <h1 className="text-3xl font-bold">Previous Calls</h1> */}
      <h1 className="text-3xl font-bold">История Звонков</h1>

      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;
