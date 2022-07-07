import { createContext } from "react";

export const LocationContext = createContext<{
  location: string | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  location: undefined,
  setLocation: () => {
    /** */
  },
});
