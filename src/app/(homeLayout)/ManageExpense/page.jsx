import Container from "@/components/Container/Container";
import DailyExpense from "@/components/DailyExpense/DailyExpense";
import Limitation from "@/components/Limitation/Limitation";
import React from "react";
import "./ManageExpense.css";
import Link from "next/link";

const ManageExpense = () => {
  return (
    <Container>
      <div className="expense-content">
        <div>
          <h3>Your monthly expense limitation</h3>
          <Limitation></Limitation>
        </div>
        <div>
          <h3>Add your daily expense</h3>
          <DailyExpense></DailyExpense>
        </div>
      </div>
      <div className="summary-btn">
        <Link href="/ExpenseTable">
          <button type="submit" className="btn-primary">
            Your Expanse summaries
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default ManageExpense;
