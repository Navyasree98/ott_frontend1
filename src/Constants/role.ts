export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
