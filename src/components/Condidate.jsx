import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CondidateCard from "./CondidateCard";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCandidates } from "../context/condidatesContext";
import Model from "./Model";
import DropDown from "./DropDown";

import "react-toastify/dist/ReactToastify.css";

function Condidate() {
  const { candidates, addCandidate } = useCandidates();
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFilterData(
      candidates?.filter((e) => {
        return e.fullName.startsWith(inputValue);
      })
    );
  }, [candidates, inputValue]);

  function fn(val) {
    if (val == "All") {
      setFilterData(
        candidates?.filter((e) => {
          return e.fullName.startsWith(inputValue);
        })
      );
    } else {
      setFilterData(
        filterData?.filter((e) => {
          return e.status == val || e.department == val;
        })
      );
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    formState
  } = useForm();

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("department", data.department);
    formData.append("experience", data.experience);

    if (data.resume[0]) {
      formData.append("resume", data.resume[0]);
    }
    try {
      const res = await addCandidate(formData);
      reset();
      toast.success("Candidate added successfully!");
      closeModel();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const [showModel, setShowModel] = useState(false);

  function openModel() {
    setShowModel(true);
  }

  function closeModel() {
    setShowModel(false);
  }

  return (
    <div className="p-5 lg:w-[80vw] ">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="hidden md:flex text-sm lg:text-xl gap-5">
          {/* Dropdown for Status Filter */}
          <DropDown
            options={["New", "Ongoing", "Selected", "Rejected"]}
            fn={fn}
          />

          {/* Dropdown for Department Filter */}
          <DropDown
            options={candidates.map((e) => {
              return e.department;
            })}
            fn={fn}
          />
        </div>

        <div className="flex text-sm lg:text-xl md:gap-5 justify-between w-full md:w-fit">
          <div className="border-2 hidden border-[#6C39D6] md:flex rounded-full items-center justify-center overflow-hidden lg:px-4 px-1 lg:py-2 py-1">
            <CiSearch />
            <input
              className="lg:w-full w-fit outline-none pl-2 text-sm"
              type="text"
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
          <button
            onClick={openModel}
            className="px-10 py-2 rounded-full bg-[#6C39D6] font-semibold text-white"
          >
            Add Candidate
          </button>
        </div>
      </div>
      <div className="relative border-2 w-full h-full border-gray-300 rounded-2xl overflow-auto">
        {/* Modal */}
        {showModel && (
          <Model>
            <div className="absolute bg-white z-50 w-full h-full">
              <div className="w-full h-20 bg-[#6C39D6] flex items-center justify-between px-10 text-3xl font-semibold text-white">
                <div></div>
                <div className="text-base md:text-2xl">Add New Candidate</div>
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
                      required={true}
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Full Name"
                      {...register("fullName")}
                      type="text"
                    />
                    <input
                      required={true}
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Email Address"
                      {...register("email")}
                      type="email"
                    />
                    <input
                      required={true}
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Phone Number"
                      {...register("phoneNumber")}
                      type="number"
                      maxLength={10}
                      minLength={10}
                    />
                    <input
                      required={true}
                      className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Department"
                      {...register("department")}
                      type="text"
                    />
                    <input
                      required={true}
                     className="md:h-14 h-10 text-sm w-full rounded-2xl p-5 outline-none md:text-2xl border-4 border-[#6C39D6]"
                      placeholder="Experience"
                      {...register("experience")}
                      type="number"
                      max={10}
                      min={0}
                    />
                    <div className="md:h-14 h-12 w-full relative rounded-2xl md:p-5 p-2 outline-none md:text-2xl border-4 border-[#6C39D6] flex items-center justify-between"
                     >
                      <span className="text-zinc-400">Upload Resume</span>
                      <label
                        htmlFor="resume"
                        className="bg-[#6C39D6] text-white px-2 py-1 text-xs md:text-base rounded-lg cursor-pointer"
                      >
                        Choose File
                      </label>
                      <input
                        id="resume"
                        required={true}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...register("resume")}
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center">
                  <input
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? "0.5" : "1" }}
                      className="bg-zinc-600 cursor-pointer text-white md:w-80 md:h-14 w-40 h-10 text-sm rounded-xl mt-2 font-semibold md:text-2xl"
                      type="submit"
                      value={isSubmitting?"Saving...":"Save"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Model>
        )}


        <div className="overflow-auto h-[65vh]">
        <div className ="grid h-10 text-white items-center grid-cols-[40px_60px_200px_200px_150px_180px_80px_100px_100px_50px] bg-[#6334C4] font-semibold text-md" 
        >
          <div className=" bg-[#6334C4] h-10 text-center"></div>
          <div className="bg-[#6334C4] h-10 text-left">Sr no.</div>
          <div className="bg-[#6334C4] h-10 text-left">Candidates Name</div>
          <div className="bg-[#6334C4] h-10 text-left">Email Address</div>
          <div className="bg-[#6334C4] h-10 text-left">Phone Number</div>
          <div className="bg-[#6334C4] h-10 text-left">Position</div>
          <div className="bg-[#6334C4] h-10 text-left">Status</div>
          <div className="bg-[#6334C4] h-10 text-left">Experience</div>
          <div className="bg-[#6334C4] h-10 text-left">Resume</div>
          <div className="bg-[#6334C4] h-10 text-center">Delete</div>
        </div>
          {filterData?.map((item, idx) => {
            return <CondidateCard key={idx} item={item} idx={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Condidate;
