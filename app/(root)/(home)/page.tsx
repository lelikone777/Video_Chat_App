import type { Metadata } from "next";

import MeetingTypeList from "@/components/MeetingTypeList";
import HomeHero from "@/components/HomeHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Start instant calls, schedule meetings, and join video rooms in WaveMeet.",
  path: "/",
});

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <HomeHero />
      <MeetingTypeList />
    </section>
  );
};

export default Home;
