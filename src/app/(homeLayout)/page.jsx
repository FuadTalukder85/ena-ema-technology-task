import React from "react";
import "./page.css";
import Link from "next/link";
const page = () => {
  return (
    <div className="root-div">
      <Link href="/ExpenseForm">
        <button className="btn-primary">Set your limit</button>
      </Link>
    </div>
  );
};

export default page;
