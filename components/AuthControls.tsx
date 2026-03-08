"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const AuthControls = () => {
  return (
    <div className="fixed right-4 top-4 z-[120] flex items-center gap-2">
      <Show when="signed-out">
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
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
};

export default AuthControls;
