import type { Metadata } from "next";
import { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Meeting Room",
  description: "Join your WaveMeet video call room.",
  path: "/meeting",
  noIndex: true,
});

const MeetingLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default MeetingLayout;
