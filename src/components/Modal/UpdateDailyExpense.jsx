import React, { useState } from "react";
import "./UpdateDailyExpense.css";

const UpdateDailyExpense = ({ onClose, selectedTask, onSubmit }) => {
  const [expenseData, setExpenseData] = useState({
    groceries: selectedTask?.groceries?.expense || "",
    transportation: selectedTask?.transportation?.expense || "",
    healthcare: selectedTask?.healthcare?.expense || "",
    utility: selectedTask?.utility?.expense || "",
    charity: selectedTask?.charity?.expense || "",
    miscellaneous: selectedTask?.miscellaneous?.expense || "",
  });

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate each category
    for (const category of Object.keys(expenseData)) {
      const enteredExpense = parseFloat(expenseData[category]) || 0;
      const categoryLimit = parseFloat(selectedTask?.[category]?.limit || 0);
      const categoryExpense = parseFloat(
        selectedTask?.[category]?.expense || 0
      );
      const remainingLimit = categoryLimit - categoryExpense;

      if (enteredExpense > remainingLimit) {
        alert(
          `Expense for ${category} exceeds the remaining limit of ${remainingLimit.toFixed(
            2
          )}!`
        );
        return;
      }
    }

    const updatedData = { expenseData };
    onSubmit(updatedData);
  };

  return (
    <div className="update-expense">
      <div className="update-expense-content">
        <div>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Update Expense</h3>
          <table>
            <thead>
              <tr>
                <th>Groceries</th>
                <th>Transportation</th>
                <th>Healthcare</th>
                <th>Utility</th>
                <th>Charity</th>
                <th>Miscellaneous</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  "groceries",
                  "transportation",
                  "healthcare",
                  "utility",
                  "charity",
                  "miscellaneous",
                ].map((category) => (
                  <td key={category}>
                    <input
                      type="number"
                      name={category}
                      value={expenseData[category]}
                      onChange={handleExpenseChange}
                      placeholder={`Expense ${category}`}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="btn-update-expense">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDailyExpense;
