import { useState, useEffect } from "react";
const useCurrentDateAndMonth = () => {
  const [currentDate, setCurrentDate] = useState({
    formattedDate: "",
    monthName: "",
  });
  useEffect(() => {
    const date = new Date();
    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    // Get full month name
    const monthName = date.toLocaleString("default", { month: "long" });
    setCurrentDate({
      formattedDate: `${day}.${monthNumber}.${year}`,
      monthName,
    });
  }, []);
  return currentDate;
};
export default useCurrentDateAndMonth;
