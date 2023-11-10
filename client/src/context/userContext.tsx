import { createContext } from "react";

export type User = { id: number | null; name: string | null };

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default UserContext;
