"use client";
import { useForm } from "react-hook-form";
import { useAddTasksMutation } from "@/redux/features/tasksApi/TasksApi";
import "./DailyExpense.css";
const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];
const DailyExpense = () => {
  const [addTasks] = useAddTasksMutation();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const { expense, item, purpose } = data;
    if (!item) return;

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
        <input type="number" placeholder="Amount" {...register("expense")} />
        <select {...register("item")}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Purpose"
          {...register("purpose")}
        />
        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default DailyExpense;
