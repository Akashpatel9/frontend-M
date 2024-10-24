import React, { useState } from "react";

function DropDown({ options, fn }) {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  return (
    <select
      className="ml-5 lg:px-2 lg:py-2 py-1 border-2 border-[#6C39D6] rounded-full"
      value={selectedDepartment}
      onChange={(e) => {
          setSelectedDepartment(e.target.value)
          fn(e.target.value)
    }}
    >
      <option value="All">All</option>
      {options.map((opt) => (
        <option className="" key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
