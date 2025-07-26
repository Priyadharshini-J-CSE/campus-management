import React, { createContext, useContext, useState } from 'react';
import { mockTimetable } from '../utils/mockData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [timetable, setTimetable] = useState(mockTimetable);

  const value = {
    timetable,
    setTimetable
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
