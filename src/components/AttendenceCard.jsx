import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCandidates } from "../context/condidatesContext";
import axios from "axios";
import { toast } from "react-toastify";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function AttendanceCard({ item, employDetailsHandler }) {
  const { updateCandidateTask, updateCandidateAttandence, editCandidate, deleteCandidate } = useCandidates(); // Destructure context
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(item?.attendenceStatus);
  const [task, setTask] = useState(item?.task);
  const debouncedTask = useDebounce(task, 500);

  // Status options
  const statusOptions = [
    "Present",
    "Absent",
    "Medical Leave",
    "Work From Home",
  ];

  // Update attendance status when selectedStatus changes
  useEffect(() => {
    if (selectedStatus !== item.attendenceStatus) {
        updateCandidateAttandence(item._id, selectedStatus);
        setIsOpen(false)
    }
  }, [selectedStatus]);

  // Update task state with debouncedTask
  useEffect(() => {
    if (debouncedTask !== item?.task) {
      saveData(debouncedTask);
    }
  }, [debouncedTask]);

  const saveData = async (task) => {
    try {
        updateCandidateTask(item._id, task);
    } catch (error) {
      toast.error("Error updating task.");
      console.log(error);
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCandidate(item._id); 
      toast.success("Candidate deleted successfully!");
    } catch (error) {
      toast.error("Error deleting candidate.");
      console.log(error);
    }
    setIsOpen(false);
  };

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(item);
  
  const color = {
    "Present": "black",
    "Absent": "red",
    "Medical Leave": "green",
    "Work From Home": "black",
  }[item.attendenceStatus];


  return (
    <div style={{color:color}} className="grid my-5 grid-cols-[40px_100px_200px_150px_200px_300px_150px_80px] font-semibold text-md items-center">
      <div className="p-2 text-left">
        <div style={{backgroundColor:color}} className="h-5 w-5 rounded-lg"></div>
      </div>
      <div className="flex items-center justify-start ">
        <div className="h-8 w-8 rounded-full bg-red-300 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1728411666518-cc54a750bf05?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>
      <div className="text-left">{item?.fullName}</div>
      <div className="text-left">{item?.position}</div>
      <div className="text-left">{item?.department}</div>
      <input
        className="text-left outline-none p-2 underline cursor-text"
        type="text"
        placeholder={item?.task === "N/A" || item?.task === "" ? "--" : item?.task}
        required={true}
        onChange={(e) => setTask(e.target.value)}
        defaultValue={task}
      />
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative text-left cursor-pointer underline"
      >
        {selectedStatus}
        {isOpen && (
          <div className="absolute bg-white border border-gray-300 rounded shadow-lg z-10">
            {statusOptions.map((status) => (
              <div
                key={status}
                className=" hover:bg-gray-200 cursor-pointer"
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-start p-2 gap-3 text-2xl relative">
        <BsThreeDotsVertical onClick={() => setIsOpen2((prev) => !prev)} />
        {isOpen2 && (
          <div
            ref={dropdownRef}
            className=" absolute -left-10 top-8 text-black z-10 bg-white border border-gray-300 text-md p-1 rounded-md shadow-md mt-1"
          >
            <div
              className=" hover:bg-gray-200 cursor-pointer"
              onClick={() =>{ 
                setIsOpen2(false)
                employDetailsHandler(item._id, true)}}
            >
              Edit
            </div>
            <div
              className=" hover:bg-gray-200 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceCard;
