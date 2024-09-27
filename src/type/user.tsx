export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  password: string | number;
  email: string;
  image?: string | undefined;
  role: "user" | "admin";
}
