"use client";
import React from "react";
import Container from "@/components/Container/Container";
import "./ExpenseTable.css";
import { useGetTasksQuery } from "@/redux/features/tasksApi/TasksApi";
import useCurrentDateAndMonth from "@/hooks/useCurrentDate";
import Link from "next/link";
const ExpenseTable = () => {
  const { data: tasks } = useGetTasksQuery();
  const { monthName, formattedDate } = useCurrentDateAndMonth();

  // Dynamically calculate the number of days in the current month
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // Months are 0-indexed in JavaScript
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate an array of dates for the current month
  const allDates = Array.from(
    { length: daysInMonth },
    (_, i) =>
      String(i + 1).padStart(2, "0") +
      "." +
      formattedDate.split(".")[1] +
      "." +
      formattedDate.split(".")[2]
  );

  // Filter data for the current month
  const currentMonthData =
    tasks?.filter((task) => task.month === monthName) || [];

  // Create a map of tasks by date for easier lookup
  const taskByDate = currentMonthData.reduce((acc, task) => {
    acc[task.date] = task;
    return acc;
  }, {});
  return (
    <div className="expense-table">
      <Container>
        <div className="expense-btn">
          <div>
            <h3>Your daily expense list</h3>
          </div>
          <div>
            <Link href="/ExpenseForm">
              <button type="submit" className="btn-primary">
                Monthly Expanse Limits
              </button>
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Groceries</th>
              <th>Transportation</th>
              <th>Healthcare</th>
              <th>Utility</th>
              <th>Charity</th>
              <th>Miscellaneous</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDates?.map((date) => {
              const task = taskByDate[date] || {};
              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>
                    {task.groceries?.todayExpense > 0
                      ? `$ ${task.groceries?.todayExpense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.transportation?.todayExpense > 0
                      ? `$ ${task.transportation?.todayExpense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.healthcare?.todayExpense > 0
                      ? `$ ${task.healthcare?.todayExpense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.utility?.todayExpense > 0
                      ? `$ ${task.utility?.todayExpense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.charity?.todayExpense > 0
                      ? `$ ${task.charity?.todayExpense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.miscellaneous?.todayExpense > 0
                      ? `$ ${task.miscellaneous?.todayExpense}.00`
                      : ""}
                  </td>
                  <td>
                    <div className="action">
                      <button className="btn-update">Edit</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default ExpenseTable;
