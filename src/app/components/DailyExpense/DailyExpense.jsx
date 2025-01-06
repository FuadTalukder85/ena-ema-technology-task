"use client";
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
  return (
    <div className="dailyExpense-input">
      <form className="">
        <input type="number" placeholder="Amount" />
        <select>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Purpose"
        />
        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default DailyExpense;
