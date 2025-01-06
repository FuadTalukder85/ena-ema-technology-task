"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const transformedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, { limit: value }])
    );
    console.log(transformedData);
  };
  return (
    <div className="container-center">
      <div className="expense">
        <div className="form-head">
          <div>
            <h2 className="">Set Monthly Spending Limits</h2>
          </div>
          <Link href="/ExpenseTable">
            <button type="submit" className="btn-primary">
              Your daily expense
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
                {...register("groceries")}
              />
            </div>
            <div className="">
              <label htmlFor="">Transportation*</label>
              <input
                type="number"
                placeholder="Limit for Transportation"
                {...register("transportation")}
              />
            </div>
          </div>
          <div className="form-style">
            <div className="">
              <label htmlFor="">Healthcare*</label>
              <input
                type="number"
                placeholder="Limit for Healthcare"
                {...register("healthcare")}
              />
            </div>
            <div className="">
              <label htmlFor="">Utility*</label>
              <input
                type="number"
                placeholder="Limit for Utility"
                {...register("utility")}
              />
            </div>
          </div>
          <div className="form-style">
            <div className="">
              <label htmlFor="">Charity*</label>
              <input
                type="number"
                placeholder="Limit for Charity"
                {...register("charity")}
              />
            </div>
            <div className="">
              <label htmlFor="">Miscellaneous*</label>
              <input
                type="number"
                placeholder="Limit for Miscellaneous"
                {...register("miscellaneous")}
              />
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
