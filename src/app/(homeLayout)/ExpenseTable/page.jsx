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

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleUpdateModal = (task) => {
    if (!task || Object.keys(task).length === 0) {
      alert("No data exists for this date");
      return;
    }
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    await updateTasks({
      id: selectedTask._id,
      expenseData: updatedData.expenseData,
    });
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
                    {task.groceries?.expense > 0
                      ? `$ ${task.groceries?.expense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.transportation?.expense > 0
                      ? `$ ${task.transportation?.expense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.healthcare?.expense > 0
                      ? `$ ${task.healthcare?.expense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.utility?.expense > 0
                      ? `$ ${task.utility?.expense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.charity?.expense > 0
                      ? `$ ${task.charity?.expense}.00`
                      : ""}
                  </td>
                  <td>
                    {task.miscellaneous?.expense > 0
                      ? `$ ${task.miscellaneous?.expense}.00`
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
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(taskByDate[selectedDate]._id)}
                  className="btn-delete"
                >
                  Delete
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
