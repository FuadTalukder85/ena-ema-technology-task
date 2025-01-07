"use client";
import { useForm } from "react-hook-form";
import {
  useAddTasksMutation,
  useGetTasksQuery,
} from "@/redux/features/tasksApi/TasksApi";
import "./DailyExpense.css";
import { useGetStatsQuery } from "@/redux/features/all-stats/AllStatsApi";
import useCurrentDateAndMonth from "@/hooks/useCurrentDate";
import { useState } from "react";
const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];
const DailyExpense = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [selectedAmount, setSelectedAmount] = useState();
  const [addTasks] = useAddTasksMutation();
  const { data: stats } = useGetStatsQuery();
  const { data: tasks } = useGetTasksQuery();
  const { monthName } = useCurrentDateAndMonth();

  // Get current month stats and tasks
  const currentStats = stats?.find((month) => month.month === monthName);
  const currentTask = tasks?.find((task) => task.month === monthName);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { expense, item, purpose } = data;

    // Set selected item and amount
    setSelectedItem(item);
    setSelectedAmount(expense);

    // Dynamically calculate remaining limit for the selected category
    const categoryLimit = currentTask?.[item.toLowerCase()]?.limit || 0;
    const categoryExpense = currentStats?.[`${item.toLowerCase()}Expense`] || 0;
    const remainingLimit = categoryLimit - categoryExpense;

    // console.log(`Remaining Limit for ${item}:`, remainingLimit);

    // Validate if the expense exceeds the remaining limit
    if (expense > remainingLimit) {
      return alert(`Expense exceeds the remaining limit for ${item}!`);
    }

    // and add task
    const transformedData = {
      [item.toLowerCase()]: {
        expense,
        item,
        purpose,
      },
    };

    addTasks(transformedData);
    reset();
  };
  return (
    <div className="dailyExpense-input">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <input
            type="number"
            placeholder="Amount"
            {...register("expense", { required: true })}
          />
          <p className="error-msg">
            {errors.expense && <span>This field is required</span>}
          </p>
        </div>
        <div>
          <select {...register("item", { required: true })}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="error-msg">
            {errors.item && <span>This field is required</span>}
          </p>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Purpose"
            {...register("purpose", { required: true })}
          />
          <p className="error-msg">
            {errors.purpose && <span>This field is required</span>}
          </p>
        </div>
        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default DailyExpense;
