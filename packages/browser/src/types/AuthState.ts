import User from "types/User";

export default interface AuthState {
  token: string;
  user: User | undefined;
}
