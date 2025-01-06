import React from "react";
import Link from "next/link";
import "./ExpenseForm.css";

const ExpenseForm = () => {
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
        <form className="expense-form" action="">
          <div className="form-style">
            <div className="">
              <label htmlFor="">Groceries*</label>
              <input type="text" placeholder="Limit for Groceries" />
            </div>
            <div className="">
              <label htmlFor="">Transportation*</label>
              <input type="text" placeholder="Limit for Transportation" />
            </div>
          </div>
          <div className="form-style">
            <div className="">
              <label htmlFor="">Healthcare*</label>
              <input type="text" placeholder="Limit for Healthcare" />
            </div>
            <div className="">
              <label htmlFor="">Utility*</label>
              <input type="text" placeholder="Limit for Utility" />
            </div>
          </div>
          <div className="form-style">
            <div className="">
              <label htmlFor="">Charity*</label>
              <input type="text" placeholder="Limit for Charity" />
            </div>
            <div className="">
              <label htmlFor="">Miscellaneous*</label>
              <input type="text" placeholder="Limit for Miscellaneous" />
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
