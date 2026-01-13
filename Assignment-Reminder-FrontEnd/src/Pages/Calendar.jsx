import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import api from "../api/axios";

const AssignmentCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    api.get("/assignments").then(res => {
      setAssignments(res.data);
    });
  }, []);

  return (
    <div 
    className="min-h-screen w-screen flex justify-center flex-col items-center p-10 text-white">
      <h1 className="text-4xl shadow-[0_0_20px_rgba(56,189,248,)0.45] drop-shadow-blue-700 font-semibold mb-8">
        Assignment Calendar
      </h1>

      <div className="flex gap-20">

        {/* Calendar */}
        <div className="calendar-glass gap-10 m-5">
          <Calendar
          className={`m-5`}
            value={value}
            onChange={setValue}
            calendarType="gregory"
            tileContent={({ date }) => {
              const hasAssignment = assignments.some(
                a => new Date(a.dueDate).toDateString() === date.toDateString()
              ) && date >= new Date();

              return hasAssignment ? (
                <div className="dot"></div>
              ) : null;
            }}
          />
        </div>

        {/* Side panel */}
        <div className="w-1/2 flex flex-col gap-5 glass-panel">
          <h2 className="text-xl text-center  mb-4">
            {value.toDateString()}
          </h2>

          {assignments.filter(
            a => new Date(a.dueDate).toDateString() === value.toDateString()
          ).length === 0 && (
            <p className="text-gray-400 p-10">No assignments</p>
          )}

          {assignments
            .filter(
              a => new Date(a.dueDate).toDateString() === value.toDateString()
            )
            .map(a => (
              <div
                key={a.id}
                className="assignment-card"
              >
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm text-gray-400">{a.subject}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCalendar;
