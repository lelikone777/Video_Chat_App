export type AppUser = {
  id: string;
  username: string;
  imageUrl: string;
};

export const APP_DEMO_USER: AppUser = {
  id: "demo-user",
  username: "Demo User",
  imageUrl: "/images/avatar-1.jpeg",
};
