import { APP_DEMO_USER } from "@/lib/demo-user";

export const useAppUser = () => {
  return {
    isLoaded: true,
    user: APP_DEMO_USER,
  };
};
