import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "YOOM",
  // description: "Video calling App",
  title: "Видео Звонки",
  description: "Приложение для Видео Звонков",
  icons: {
    icon: "/icons/logo.svg",
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
