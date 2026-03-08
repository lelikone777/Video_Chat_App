"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

const AuthControls = () => {
  const { isSignedIn, sessionId } = useAuth();

  return (
    <div className="fixed right-4 top-4 z-[120] flex items-center gap-2">
      <ClerkLoading>
        <div className="h-9 w-9 rounded-full border border-white/30 bg-dark-1" />
      </ClerkLoading>

      <ClerkLoaded>
        {isSignedIn ? (
          <UserButton key={sessionId ?? "signed-in"} />
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="rounded-md bg-blue-1 px-3 py-1.5 text-sm font-semibold text-white">
                Войти
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-md border border-white/30 bg-dark-1 px-3 py-1.5 text-sm font-semibold text-white">
                Зарегистрироваться
              </button>
            </SignUpButton>
          </>
        )}
      </ClerkLoaded>
    </div>
  );
};

export default AuthControls;
