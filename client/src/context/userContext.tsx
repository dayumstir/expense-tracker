import { createContext } from "react";
import User from "../types/User";


type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default UserContext;
