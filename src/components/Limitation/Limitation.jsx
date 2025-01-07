"use client";
import React from "react";
import "./Limitation.css";
import { useGetTasksQuery } from "@/redux/features/tasksApi/TasksApi";
import useCurrentDateAndMonth from "@/hooks/useCurrentDate";

const Limitation = () => {
  const { data: tasks } = useGetTasksQuery();
  const { monthName } = useCurrentDateAndMonth();

  // Filter the tasks for January
  const januaryData = tasks?.filter((task) => task.month === monthName);
  console.log(januaryData);

  return (
    <div className="limitation-main">
      <div className="limitation">
        {januaryData?.map((limit) => (
          <div key={limit._id} className="limitation-content">
            <h5>Limit for Grocery {limit.groceries.limit} : </h5> <p>$20.00</p>
          </div>
        ))}
      </div>

      <button type="submit" className="btn-primary">
        Update monthly expense
      </button>
    </div>
  );
};

export default Limitation;
