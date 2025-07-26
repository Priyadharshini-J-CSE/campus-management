export const mockAnnouncements = [
  {
    id: 1,
    title: 'Mid-term Exams Schedule',
    content: 'Mid-term exams will be conducted from March 15-25. Please check your individual timetables.',
    category: 'Exams',
    date: '2025-07-20',
    author: 'Academic Office'
  },
  {
    id: 2,
    title: 'Cultural Fest 2025',
    content: 'Annual cultural fest will be held on April 10-12. Registration starts from March 1st.',
    category: 'Events',
    date: '2025-07-18',
    author: 'Student Council'
  },
  {
    id: 3,
    title: 'Library Hours Extended',
    content: 'Library will remain open till 11 PM during exam season for student convenience.',
    category: 'General',
    date: '2025-07-15',
    author: 'Library Staff'
  }
];

export const mockLostFoundItems = [
  {
    id: 1,
    title: 'Black Wallet',
    description: 'Lost near library entrance, contains ID card',
    category: 'Personal',
    location: 'Library',
    date: '2025-07-22',
    type: 'lost',
    contact: 'john@student.edu'
  },
  {
    id: 2,
    title: 'Blue Water Bottle',
    description: 'Found in cafeteria, has stickers on it',
    category: 'Personal',
    location: 'Cafeteria',
    date: '2025-07-21',
    type: 'found',
    contact: 'admin@college.edu'
  }
];

export const mockTimetable = [
  {
    id: 1,
    subject: 'Mathematics',
    day: 'Monday',
    time: '09:00-10:00',
    room: 'Room 101',
    instructor: 'Dr. Smith'
  },
  {
    id: 2,
    subject: 'Physics',
    day: 'Monday',
    time: '10:00-11:00',
    room: 'Lab 1',
    instructor: 'Prof. Johnson'
  },
  {
    id: 3,
    subject: 'Chemistry',
    day: 'Tuesday',
    time: '09:00-10:00',
    room: 'Lab 2',
    instructor: 'Dr. Brown'
  }
];

export const mockComplaints = [
  {
    id: 1,
    title: 'Water Supply Issue',
    description: 'No water supply in Room 204 since morning',
    category: 'Water',
    status: 'pending',
    date: '2025-07-23',
    room: '204'
  },
  {
    id: 2,
    title: 'Broken Light',
    description: 'Corridor light not working properly',
    category: 'Electricity',
    status: 'in-progress',
    date: '2025-07-22',
    room: 'Corridor B'
  },
  {
    id: 3,
    title: 'Cleaning Request',
    description: 'Need deep cleaning of common area',
    category: 'Cleaning',
    status: 'resolved',
    date: '2025-07-20',
    room: '305'
  }
];