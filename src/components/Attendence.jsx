import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useCandidates } from "../context/condidatesContext";
import Model from "./Model";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDown from "./DropDown";
import AttendenceCard from "./AttendenceCard";

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Attendence() {
  const { candidates, loading, error, editCandidate } = useCandidates();
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editableEmployDetail, setEditableEmployDetail] = useState();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFilteredEmployes(
      candidates.filter((e) => {
        return e.status === "Selected" && e.fullName.startsWith(inputValue);
      })
    );
  }, [candidates, inputValue]);

  function fn(val) {
    if (val == "All") {
      setFilteredEmployes(
        candidates.filter((e) => {
          return e.status === "Selected" && e.fullName.startsWith(inputValue);
        })
      );
    } else {
      setFilteredEmployes(
        filteredEmployes?.filter((e) => {
          return (
            (e.status == val || e.department == val) && e.status === "Selected"
          );
        })
      );
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function openModel() {
    setShowModel(true);
  }

  function closeModel() {
    setShowModel(false);
  }

  function employDetailsHandler(id, open) {
    if (open) openModel();

    const filteredEmployee = candidates.find((e) => e._id === id);
    if (filteredEmployee) {
      setEditableEmployDetail(filteredEmployee);
    }
  }

  useEffect(() => {
    if (editableEmployDetail) {
      const formattedDetail = {
        ...editableEmployDetail,
        dateOfJoining: formatDateForInput(editableEmployDetail.dateOfJoining),
      };
      reset(formattedDetail);
    }
  }, [editableEmployDetail, reset]);

  const onSubmit = async (data) => {
    try {
      await editCandidate(editableEmployDetail._id, data);
      toast.success("Employee details updated successfully!");
      reset();
      closeModel();
    } catch (error) {
      toast.error("Error updating employee details.");
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5 lg:w-[80vw] ">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="flex md:text-xl text-xs gap-2 justify-between w-full">
          <DropDown
            options={candidates.map((e) => {
              return e.department;
            })}
            fn={fn}
          />

          <div className="border-2 border-[#6C39D6] flex rounded-full items-center justify-center overflow-hidden px-4 py-2">
            <CiSearch />
            <input
              className="w-full outline-none pl-2"
              type="text"
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="relative border-2 border-gray-300 rounded-3xl overflow-auto">
        {showModel && (
          <Model>
            <div className="absolute bg-white z-50 w-full h-full t-0">
              <div className="w-full h-20 bg-[#6C39D6] flex items-center justify-between px-10 text-3xl font-semibold text-white">
                <div></div>
                <div className="text-base md:text-2xl">Edit Candidate</div>
                <div
                  onClick={closeModel}
                  className="bg-white cursor-pointer h-7 w-7 rounded-full flex items-center justify-center font-bold text-[#6C39D6] text-xl"
                >
                  x
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-5 md:p-10 p-2 md:mt-10">
                    <input
                      required
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Full Name"
                      {...register("fullName", {
                        required: "Full Name is required.",
                      })}
                      type="text"
                    />
                    {errors.fullName && (
                      <span className="text-red-500">
                        {errors.fullName.message}
                      </span>
                    )}
                    <input
                      required
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Email Address"
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^\S+@\S+$/,
                          message: "Invalid email format.",
                        },
                      })}
                      type="email"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    <input
                      required
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Phone Number"
                      {...register("phoneNumber", {
                        required: "Phone Number is required.",
                        minLength: {
                          value: 10,
                          message: "Phone Number must be 10 digits.",
                        },
                      })}
                      type="number"
                      maxLength={10}
                      minLength={10}
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                    <input
                      required
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Department"
                      {...register("department", {
                        required: "Department is required.",
                      })}
                      type="text"
                    />
                    {errors.department && (
                      <span className="text-red-500">
                        {errors.department.message}
                      </span>
                    )}
                    <select
                      required
                      className="h-14 rounded-2xl p-2 outline-none text-2xl border-4 border-[#6C39D6]"
                      {...register("position")}
                    >
                      <option value="" disabled selected>
                        Select Position
                      </option>
                      <option value="Intern">Intern</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Team Lead">Team Lead</option>
                    </select>
                    {errors.experience && (
                      <span className="text-red-500">
                        {errors.experience.message}
                      </span>
                    )}
                    <input
                      required
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Date of Joining"
                      {...register("dateOfJoining", {
                        required: "Date of Joining is required.",
                      })}
                      type="date"
                    />
                    {errors.dateOfJoining && (
                      <span className="text-red-500">
                        {errors.dateOfJoining.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <input
                      className="bg-zinc-600 cursor-pointer text-white md:w-80 md:h-14 w-40 h-10 text-sm rounded-xl mt-2 font-semibold md:text-2xl"
                      type="submit"
                      value={"Save"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Model>
        )}

        {/* Header Row */}
        {/* <div className="grid grid-cols-[40px_100px_200px_150px_200px_300px_150px_80px] bg-[#6334C4] text-white text-md font-bold h-20 items-center">
          <div className="text-left"></div>
          <div className="text-left">Profile</div>
          <div className="text-left">Employee Name</div>
          <div className="text-left">Designation</div>
          <div className="text-left">Department</div>
          <div className="text-left">Task</div>
          <div className="text-left">Status</div>
          <div className="text-left"></div>
        </div> */}

        {/* Data Rows */}
        <div className="overflow-auto h-[65vh]">
        <div className="grid grid-cols-[40px_100px_200px_150px_200px_300px_150px_80px] bg-[#6334C4] text-white text-md font-bold h-10 items-center">
          <div className="text-left bg-[#6334C4] h-10"></div>
          <div className="text-left bg-[#6334C4] h-10">Profile</div>
          <div className="text-left bg-[#6334C4] h-10">Employee Name</div>
          <div className="text-left bg-[#6334C4] h-10">Designation</div>
          <div className="text-left bg-[#6334C4] h-10">Department</div>
          <div className="text-left bg-[#6334C4] h-10">Task</div>
          <div className="text-left bg-[#6334C4] h-10">Status</div>
          <div className="text-left bg-[#6334C4] h-10"></div>
        </div>
          {filteredEmployes?.map((item) => (
            <AttendenceCard
              key={item._id}
              item={item}
              employDetailsHandler={employDetailsHandler}
            /> // Pass edit handler to card
          ))}
        </div>
      </div>
    </div>
  );
}

export default Attendence;
