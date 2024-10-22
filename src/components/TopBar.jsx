import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineVerticalDistribute } from "react-icons/md";
import { CandidatesContext } from "../context/condidatesContext";

function TopBar() {
  const location = useLocation();

  const {setNev} = useContext(CandidatesContext)
  

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Candidates";
      case "/employees":
        return "Employees";
      case "/attendence":
        return "Attendance";
      case "/leave":
        return "Leaves";
    }
  };

  return (
    <div className="lg:w-[80vw] md:text-2xl h-20 flex items-center md:px-10 px-5 border-b-4 font-semibold bottom-zinc-400 justify-between">
      <div className="flex items-center gap-5">
        <h1 className="lg:hidden">
          <MdOutlineVerticalDistribute onClick={()=>setNev(true)} />
        </h1>
        <h1>{getTitle(location.pathname)}</h1>
      </div>
      <div className="flex items-center gap-5 text-lg">
        <IoMailOutline />
        <FaRegBell />
        <div className="flex items-center">
          <div className="bg-red-300 h-8 w-8 rounded-full overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1728497241495-32c2fe693b4f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <MdKeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
