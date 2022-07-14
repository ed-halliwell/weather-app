import { useState, useMemo } from "react";
import { LocationContext } from "../contexts/LocationContext";

interface LocationContextWrapperProps {
  children: React.ReactNode;
}

export default function LocationContextWrapper(
  props: LocationContextWrapperProps
): JSX.Element {
  const [location, setLocation] = useState<string | undefined>(undefined);

  const locationName = useMemo(
    () => ({ location, setLocation }),
    [location, setLocation]
  );

  return (
    <LocationContext.Provider value={locationName}>
      {props.children}
    </LocationContext.Provider>
  );
}
