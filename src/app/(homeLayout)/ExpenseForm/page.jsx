"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "./ExpenseForm.css";
import {
  useAddTasksMutation,
  useGetTasksQuery,
} from "@/redux/features/tasksApi/TasksApi";
import useCurrentDateAndMonth from "@/hooks/useCurrentDate";

const ExpenseForm = () => {
  const { monthName } = useCurrentDateAndMonth();
  const [addTasks] = useAddTasksMutation();
  const { data: tasks, refetch } = useGetTasksQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const transformedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, { limit: value }])
    );
    const currentMonth = tasks.find((task) => task.month === monthName);
    if (currentMonth) {
      alert("you can add monthly limit only once");
    } else {
      await addTasks(transformedData);
      reset();
      refetch();
    }
  };
  return (
    <div className="container-center">
      <div className="expense">
        <div className="form-head">
          <div>
            <h2 className="">Set Monthly Spending Limits</h2>
          </div>
          <Link href="/ManageExpense">
            <button type="submit" className="btn-primary">
              Add daily expense
            </button>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="expense-form"
          action=""
        >
          <div className="form-style">
            <div className="">
              <label htmlFor="">Groceries*</label>
              <input
                type="number"
                placeholder="Limit for Groceries"
                {...register("groceries", { required: true })}
              />
              <p className="error-msg">
                {errors.groceries && <span>This field is required</span>}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Transportation*</label>
              <input
                type="number"
                placeholder="Limit for Transportation"
                {...register("transportation", { required: true })}
              />
              <p className="error-msg">
                {errors.transportation && <span>This field is required</span>}
              </p>
            </div>
          </div>
          <div className="form-style">
            <div className="">
              <label htmlFor="">Healthcare*</label>
              <input
                type="number"
                placeholder="Limit for Healthcare"
                {...register("healthcare", { required: true })}
              />
              <p className="error-msg">
                {errors.healthcare && <span>This field is required</span>}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Utility*</label>
              <input
                type="number"
                placeholder="Limit for Utility"
                {...register("utility", { required: true })}
              />
              <p className="error-msg">
                {errors.utility && <span>This field is required</span>}
              </p>
            </div>
          </div>
          <div className="form-style">
            <div className="">
              <label htmlFor="">Charity*</label>
              <input
                type="number"
                placeholder="Limit for Charity"
                {...register("charity", { required: true })}
              />
              <p className="error-msg">
                {errors.charity && <span>This field is required</span>}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Miscellaneous*</label>
              <input
                type="number"
                placeholder="Limit for Miscellaneous"
                {...register("miscellaneous", { required: true })}
              />
              <p className="error-msg">
                {errors.miscellaneous && <span>This field is required</span>}
              </p>
            </div>
          </div>
          <div className="limit-div">
            <button type="submit" className="btn-primary">
              Set limits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
