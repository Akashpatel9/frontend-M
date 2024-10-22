import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/usercontext";

function LoginPage() {
  const { auth, saveUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState
  } = useForm();

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('https://backend-m.onrender.com/user/signin', data);
      toast.success(res.data.message);
      await localStorage.setItem('authToken', res.data.token); 
      await saveUser(res.data.token); 
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full lg:w-1/2 flex flex-col p-4">
      <div className="absolute">
        <ToastContainer position="top-right" />
      </div>
      <div className="flex items-center gap-2">
        <div className="lg:h-8 lg:w-8 h-6 w-6 border-4 border-[#733CE4]"></div>{" "}
        <div className="md:text-2xl text-xl text-[#733CE4] font-bold">LOGO</div>
      </div>

      <div className="flex flex-col px-5 md:px-20 md:py-10 xl:px-40 xl:py-10 lg:gap-5 mt-8 md:mt-0 ">
        <div className="lg:text-2xl font-bold ">Welcome to Dashboard</div>
        <form className="flex flex-col md:gap-5 gap-2 mt-2 md:mt-0" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="font-semibold md:text-md">
            Email Address
            <input
              className="w-full border-2 border-zinc-400 p-1 md:p-2"
              type="text"
              id="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </label>

          <label htmlFor="password" className="font-semibold md:text-md">
            Password
            <input
              className="w-full border-2 border-zinc-400 p-1 md:p-2"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </label>
          <input
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? "0.5" : "1" }}
           className="bg-[#733CE4] rounded-full w-full text-xl md:py-2 py-1 text-white font-semibold cursor-pointer"
            type="submit"
            value={isSubmitting?"Loading...":"Log In"}
          />

          <div className="flex gap-3 text-xs md:text-base text-zinc-400 font-semibold">
            Don't have an account?{" "}
            <Link to={"/"} className="text-[#733CE4] cursor-pointer">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
