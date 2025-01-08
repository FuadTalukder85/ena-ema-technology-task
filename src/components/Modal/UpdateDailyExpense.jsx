import React from "react";
import "./UpdateDailyExpense.css";

const UpdateDailyExpense = ({ onClose, selectedTask, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = Object.fromEntries(formData.entries());
    onSubmit(updatedData);
  };

  return (
    <div className="update-expense">
      <div>
        <button onClick={onClose} className="modal-close-btn">
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit}>
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
                    type="text"
                    name={category}
                    defaultValue={selectedTask?.[category]?.todayExpense || ""}
                    placeholder={category}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateDailyExpense;
