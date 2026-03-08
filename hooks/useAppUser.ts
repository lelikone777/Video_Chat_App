import { useUser } from "@clerk/nextjs";

export const useAppUser = () => {
  const { isLoaded, user } = useUser();

  return {
    isLoaded,
    user: user
      ? {
          id: user.id,
          username:
            user.username || user.fullName || user.primaryEmailAddress?.emailAddress || user.id,
          imageUrl: user.imageUrl,
        }
      : null,
  };
};
