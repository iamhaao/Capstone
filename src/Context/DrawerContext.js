import { createContext, useMemo, useState } from "react";

export const SiderbarContext = createContext();

function DrawerContext({ children }) {
  const [progress, setProgress] = useState(0);

  const value = useMemo(() => ({ progress, setProgress }), [progress]);

  return (
    <SiderbarContext.Provider value={value}>
      {children}
    </SiderbarContext.Provider>
  );
}
