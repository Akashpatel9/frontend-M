import React, { useContext, useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/usercontext";
import { CandidatesContext } from "../context/condidatesContext";
import { FaWindowClose } from "react-icons/fa";

function SideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [conformBox, setConformBox] = useState(false);

  const {nev, setNev} = useContext(CandidatesContext)

  return (
    <div className={`lg:w-[20vw] absolute bg-white z-50 ${nev?"left-0":"-left-44"} md:static  h-full border-r-4 border-zinc-300 lg:flex flex-col items-center py-10 gap-10 px-5`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <div className="h-8 w-8 border-4 border-[#733CE4]"></div>{" "}
        <div className="md:text-2xl text-[#733CE4] font-bold">LOGO</div>
        </div>
        <h1 className="md:hidden">
          <FaWindowClose onClick={()=>setNev(false)} className="text-2xl text-[#733CE4]"/>
          </h1>
      </div>


      <div className="w-full border-2 mb-10 border-zinc-200"></div>

      <div className="flex flex-col gap-2">
        <div className="text-md text-zinc-400">
          Recruitement
          <div>
            <NavLink
              to={"/"}
              onClick={()=>setNev(false)}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-xl font-semibold w-full py-5":"flex items-center text-black gap-2 text-xl font-semibold w-full py-5"
              }}
            >
              <TiUserAdd />
              Candidates
            </NavLink >
          </div>
        </div>

        <div className="text-md text-zinc-400">
          Organization
          <div className="">
            <NavLink
            onClick={()=>setNev(false)}
              to={"/employees"}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-xl font-semibold w-full py-5":"flex items-center text-black gap-2 text-xl font-semibold w-full py-5"
              }}
            >
              <IoPeopleSharp /> Employees
            </NavLink >
            <NavLink 
            onClick={()=>setNev(false)}
              to={"/attendence"}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-xl font-semibold w-full py-5":"flex items-center text-black gap-2 text-xl font-semibold w-full py-5"
              }}
            >
              <MdOutlineSignalCellularAlt />
              Attendance
            </NavLink>
            <NavLink 
            onClick={()=>setNev(false)}
              to={"/leave"}
              className={({ isActive }) =>{
                return isActive?"flex text-[#733CE4] items-center gap-2 text-xl font-semibold w-full py-5":"flex items-center text-black gap-2 text-xl font-semibold w-full py-5"
              }}
            >
              <BsStars />
              Leaves
            </NavLink>
          </div>
        </div>

        <div className="text-md text-zinc-400">
          Others
          <div>
            <div
              onClick={() => {
                setConformBox(true)
                setNev(false)
              }}
              className="flex hover:text-[#733CE4] items-center text-black cursor-pointer gap-2 text-xl font-semibold w-full py-5"
            >
              <IoIosLogOut />
              Log out
            </div>

            {conformBox && (
              <div className="w-screen h-screen absolute p-4 md:p-0 top-0 left-[100%] md:left-0 z-50 bg-[#6462627a] flex items-center justify-center">
                <div className="md:w-1/2 md:h-2/5  bg-white rounded-3xl overflow-hidden">
                  <div className="bg-[#6234C1] py-5 w-full flex items-center justify-center md:text-2xl font-bold text-white">
                    Log Out
                  </div>
                  <div className="flex flex-col items-center justify-center gap-5 md:gap-10 md:mt-10 mt-5 p-2">
                    <div className="md:text-xl font-bold text-black">
                      Are you sure you want to log out?
                    </div>
                    <div className="flex md:gap-10 gap-2">
                      <button
                        onClick={() => setConformBox(false)}
                        className="bg-[#6234C1] xl:px-20 xl:py-4 px-3 py-2 cursor-pointer rounded-xl text-white font-bold text-2xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="bg-[#6234C1] cursor-pointer xl:px-20 xl:py-4 px-3 py-2 rounded-xl text-white font-bold text-2xl"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
