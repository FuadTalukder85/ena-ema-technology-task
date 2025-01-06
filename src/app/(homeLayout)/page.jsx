import React from "react";
import "./page.css";
import Link from "next/link";
const page = () => {
  return (
    <div className="root-div">
      <Link href="/Expense">
        <button className="btn-limit">Set your limit</button>
      </Link>
    </div>
  );
};

export default page;
