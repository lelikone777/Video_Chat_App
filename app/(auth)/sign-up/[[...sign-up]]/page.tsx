import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign Up",
  description: "Create a WaveMeet account and start hosting video meetings.",
  path: "/sign-up",
  noIndex: true,
});

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
