"use client";
import React from "react";
import "./Limitation.css";
import { useGetTasksQuery } from "@/redux/features/tasksApi/TasksApi";
import useCurrentDateAndMonth from "@/hooks/useCurrentDate";

const Limitation = () => {
  const { data: tasks } = useGetTasksQuery();
  const { monthName } = useCurrentDateAndMonth();
  const currentMonthData = tasks?.filter((task) => task.month === monthName);
  // console.log("currentMonthData", currentMonthData);

  const firstData = currentMonthData?.[0];
  // console.log("firstData", firstData);

  return (
    <div className="limitation-main">
      <div className="limitation">
        {firstData &&
          Object.entries(firstData).map(([key, value]) => {
            if (typeof value === "object" && value.limit) {
              return (
                <div key={key} className="limitation-content">
                  <h5>Limit for {key[0].toUpperCase() + key.slice(1)}: </h5>
                  <p>${value.limit}.00</p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Limitation;
