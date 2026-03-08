import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign Up",
  description: "Create a WaveMeet account and start hosting video meetings.",
  path: "/sign-up",
  noIndex: true,
});

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4 text-white">
      <p>Auth is temporarily disabled.</p>
      <Link href="/" className="text-blue-1 underline">
        Go to home
      </Link>
    </main>
  );
};

export default SignUpPage;
