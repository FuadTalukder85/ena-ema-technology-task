import React from "react";
import "./ExpenseTable.css";
import Container from "@/components/Container/Container";
import DailyExpense from "@/components/DailyExpense/DailyExpense";
import Limitation from "@/components/Limitation/Limitation";
const ExpenseTable = () => {
  return (
    <div className="expense-table">
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

        <h3>Your daily expense list</h3>
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
            <tr>
              <td>01.01.25</td>
              <td>$ 1200</td>
              <td>$ 1200</td>
              <td>$ 1200</td>
              <td>$ 1200</td>
              <td>$ 1200</td>
              <td>$ 1200</td>
              <td>
                <div className="action">
                  <button className="btn-update">Edit</button>
                  <button className="btn-delete">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default ExpenseTable;
