import { createContext, useState } from "react";

export const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [assignments, setAssignments] = useState([]);

  const addAssignment = (newAssignment) => {
    
    setAssignments((prev) => [...prev, newAssignment]);
  };

  return (
    <AssignmentContext.Provider
      value={{
        title, setTitle,
        subject, setSubject,
        dueDate, setDueDate,
        time, setTime,
        description, setDescription,
        assignments, setAssignments,
        addAssignment
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
