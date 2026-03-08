import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { metadataBase } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "WaveMeet",
    template: "%s | WaveMeet",
  },
  description: "WaveMeet is a browser-based app for instant and scheduled video meetings.",
  applicationName: "WaveMeet",
  keywords: [
    "WaveMeet",
    "video meetings",
    "video calls",
    "WebRTC",
    "online conferencing",
  ],
  icons: {
    icon: "/icons/logo.svg",
  },
  openGraph: {
    type: "website",
    siteName: "WaveMeet",
    title: "WaveMeet",
    description:
      "WaveMeet is a browser-based app for instant and scheduled video meetings.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveMeet",
    description:
      "WaveMeet is a browser-based app for instant and scheduled video meetings.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.className} bg-dark-2`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
