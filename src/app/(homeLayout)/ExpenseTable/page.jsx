"use client";
import React, { useState } from "react";
import Container from "@/components/Container/Container";
import "./ExpenseTable.css";
import {
  useDeleteTasksMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
} from "@/redux/features/tasksApi/TasksApi";
import useCurrentDateAndMonth from "@/hooks/useCurrentDate";
import Link from "next/link";
import UpdateDailyExpense from "@/components/Modal/UpdateDailyExpense";

const ExpenseTable = () => {
  const { data: tasks, refetch } = useGetTasksQuery();
  const [deleteTasks] = useDeleteTasksMutation();
  const [updateTasks] = useUpdateTasksMutation();
  const { monthName, formattedDate } = useCurrentDateAndMonth();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const allDates = Array.from(
    { length: daysInMonth },
    (_, i) =>
      String(i + 1).padStart(2, "0") +
      "." +
      formattedDate.split(".")[1] +
      "." +
      formattedDate.split(".")[2]
  );

  const currentMonthData =
    tasks?.filter((task) => task.month === monthName) || [];

  const taskByDate = currentMonthData.reduce((acc, task) => {
    acc[task.date] = task;
    return acc;
  }, {});

  // Delete modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDelete = (id) => {
    deleteTasks(id);
    refetch();
    alert("Task deleted successfully");
    setIsOpen(false);
  };

  const toggleModal = (date) => {
    if (!taskByDate[date]) {
      alert("No data exists for this date");
      return;
    }
    setSelectedDate(date);
    setIsOpen(true);
  };

  // Update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleUpdateModal = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    await updateTasks({ id: selectedTask._id, ...updatedData });
    refetch();
    alert("Task updated successfully");
    setShowUpdateModal(false);
  };

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
                Monthly Expense Limits
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
            {allDates.map((date) => {
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
                      <button
                        onClick={() => handleUpdateModal(task)}
                        className="btn-update"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleModal(date)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showUpdateModal && (
          <UpdateDailyExpense
            onClose={() => setShowUpdateModal(false)}
            selectedTask={selectedTask}
            onSubmit={handleUpdateSubmit}
          />
        )}
        {/* Delete Modal */}
        {isOpen && (
          <div className="modal-content">
            <div className="modal-content-2">
              <button
                onClick={() => setIsOpen(false)}
                className="modal-close-btn"
              >
                ✖
              </button>
              <p>
                Are you sure you want to delete the data for {selectedDate}?
              </p>
              <div className="modal-actions">
                <button onClick={() => setIsOpen(false)} className="btn-cancel">
                  No, cancel
                </button>
                <button
                  onClick={() => handleDelete(taskByDate[selectedDate]._id)}
                  className="btn-confirm"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ExpenseTable;
