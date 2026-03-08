import type { Metadata } from "next";
import { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Personal Room",
  description: "Use your personal WaveMeet room for quick recurring meetings.",
  path: "/personal-room",
  noIndex: true,
});

const PersonalRoomLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default PersonalRoomLayout;
