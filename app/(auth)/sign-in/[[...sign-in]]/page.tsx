import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign In",
  description: "Sign in to your WaveMeet account to join and manage meetings.",
  path: "/sign-in",
  noIndex: true,
});

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </main>
  );
};

export default SignInPage;
