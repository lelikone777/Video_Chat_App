import { render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import AuthControls from "@/components/AuthControls";
import { useAppUser } from "@/hooks/useAppUser";
import SignInPage from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import SignUpPage from "@/app/(auth)/sign-up/[[...sign-up]]/page";

type AuthState = {
  isSignedIn: boolean;
  sessionId: string | null;
};

type ClerkUserState = {
  isLoaded: boolean;
  user: any;
};

let authState: AuthState = { isSignedIn: false, sessionId: null };
let clerkUserState: ClerkUserState = { isLoaded: true, user: null };

vi.mock("@clerk/nextjs", () => ({
  ClerkLoaded: ({ children }: { children: ReactNode }) => <>{children}</>,
  ClerkLoading: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignInButton: ({ children }: { children?: ReactNode }) => (
    <div data-testid="sign-in-button">{children ?? "Sign in"}</div>
  ),
  SignUpButton: ({ children }: { children?: ReactNode }) => (
    <div data-testid="sign-up-button">{children ?? "Sign up"}</div>
  ),
  UserButton: () => <div data-testid="user-button">UserButton</div>,
  useAuth: () => authState,
  useUser: () => clerkUserState,
  SignIn: () => <div data-testid="clerk-sign-in">SignIn Component</div>,
  SignUp: () => <div data-testid="clerk-sign-up">SignUp Component</div>,
}));

describe("Auth controls", () => {
  beforeEach(() => {
    authState = { isSignedIn: false, sessionId: null };
  });

  it("shows sign in / sign up buttons for guests", () => {
    render(<AuthControls />);

    expect(screen.getByRole("button", { name: "Войти" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Зарегистрироваться" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("user-button")).not.toBeInTheDocument();
  });

  it("shows clerk user avatar/menu for signed-in users", () => {
    authState = { isSignedIn: true, sessionId: "session_123" };

    render(<AuthControls />);

    expect(screen.getByTestId("user-button")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Войти" }),
    ).not.toBeInTheDocument();
  });
});

describe("useAppUser hook", () => {
  it("maps clerk user data to app user shape", () => {
    clerkUserState = {
      isLoaded: true,
      user: {
        id: "user_1",
        username: null,
        fullName: "Test User",
        primaryEmailAddress: { emailAddress: "test@example.com" },
        imageUrl: "https://example.com/avatar.png",
      },
    };

    const { result } = renderHook(() => useAppUser());

    expect(result.current.isLoaded).toBe(true);
    expect(result.current.user).toEqual({
      id: "user_1",
      username: "Test User",
      imageUrl: "https://example.com/avatar.png",
    });
  });

  it("returns null user when clerk has no active user", () => {
    clerkUserState = { isLoaded: true, user: null };

    const { result } = renderHook(() => useAppUser());

    expect(result.current.isLoaded).toBe(true);
    expect(result.current.user).toBeNull();
  });
});

describe("Auth pages", () => {
  it("renders Clerk SignIn on sign-in route", () => {
    render(<SignInPage />);
    expect(screen.getByTestId("clerk-sign-in")).toBeInTheDocument();
  });

  it("renders Clerk SignUp on sign-up route", () => {
    render(<SignUpPage />);
    expect(screen.getByTestId("clerk-sign-up")).toBeInTheDocument();
  });
});
