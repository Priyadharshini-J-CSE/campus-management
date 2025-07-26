import React, { createContext, useContext, useState } from 'react';
import { mockTimetable, mockAnnouncements, mockLostFoundItems, mockComplaints } from '../utils/mockData';

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
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [lostFoundItems, setLostFoundItems] = useState(mockLostFoundItems);
  const [complaints, setComplaints] = useState(mockComplaints);

  const value = {
    timetable,
    setTimetable,
    announcements,
    setAnnouncements,
    lostFoundItems,
    setLostFoundItems,
    complaints,
    setComplaints
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
