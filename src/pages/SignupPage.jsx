import React from "react";
import { useForm } from "react-hook-form";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    if (data.confirmPassword != data.password) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    try {
      const res = await axios.post("https://backend-m.onrender.com/user/signup", data);
      toast.success(res.data.message); 
      navigate('/signin')
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="h-full w-1/2 flex flex-col p-2">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 border-4 border-[#733CE4]"></div>{" "}
        <div className="text-2xl text-[#733CE4] font-bold">LOGO</div>
      </div>

      <div className="flex flex-col px-52 py-10 gap-5">
        <div className="text-2xl font-bold ">Welcome to Dashboard</div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Full Name" className="font-semibold text-md">
            Full Name
            <input
              className="w-full border-2 border-zinc-400 p-2"
              type="text"
              id="Full Name"
              placeholder="Full Name"
              {...register("fullName")}
              required={true}
            />
          </label>

          <label htmlFor="email" className="font-semibold text-md">
            Email Address
            <input
              className="w-full border-2 border-zinc-400 p-2"
              type="text"
              id="email"
              placeholder="Email Address"
              {...register("email")}
              required={true}
            />
          </label>

          <label htmlFor="password" className="font-semibold text-md">
            Password
            <input
              className="w-full border-2 border-zinc-400 p-2"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
              required={true}
            />
          </label>

          <label htmlFor="conformPassword" className="font-semibold text-md">
            Conform Password
            <input
              className="w-full border-2 border-zinc-400 p-2"
              type="password"
              id="conform password"
              placeholder="Conform Password"
              {...register("confirmPassword")}
              required={true}
            />
          </label>

          <input
            className="bg-[#733CE4] rounded-full w-full text-xl py-2 text-white font-semibold cursor-pointer"
            type="submit"
            value="Register"
          />

          <div className="flex gap-3 text-zinc-400 font-semibold">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-[#733CE4] cursor-pointer">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
