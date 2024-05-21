import { jwtDecode } from "jwt-decode";

export const jwtVerify = (token: string) => {
  return jwtDecode(token);
};
