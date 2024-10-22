import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HeroSection from "./components/HeroSection";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import Condidate from "./components/Condidate";
import Employees from "./components/Employees";
import Attendence from "./components/Attendence";
import Leave from "./components/Leave";
import { useAuth } from "./context/usercontext";

function App() {
  const { auth } = useAuth();
  return (
    <div className="h-screen w-screen">
      {!auth ? (
        <Routes>
          <Route
            path="/"
            element={
              <div className="xl:px-10 px-5 xl:py-20 py-10 w-screen md:h-screen">
                <div className="flex h-full w-full border-2 border-zinc-400 rounded-2xl overflow-hidden">
                  <SignupPage />
                  <HeroSection />
                </div>
              </div>
            }
          />

          <Route
            path="/signin"
            element={
              <div className="xl:px-10 px-5 xl:py-20 py-10 w-screen md:h-screen">
                <div className="flex h-full w-full border-2 border-zinc-400 rounded-2xl overflow-hidden">
                  <LoginPage />
                  <HeroSection />
                </div>
              </div>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Condidate />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendence" element={<Attendence />} />
            <Route path="/leave" element={<Leave />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
