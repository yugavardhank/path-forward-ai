import React, { useState } from 'react';
import { AppContext } from './context';

export function AppProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  return (
    <AppContext.Provider value={{ userData, setUserData, roadmap, setRoadmap }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
