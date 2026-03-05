import Link from "next/link";

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
