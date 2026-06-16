import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

/**
 * Auth Page Component
 * Renders the Split-screen Authentication interface.
 * Left Side: Decorative brand image and quote overlay.
 * Right Side: Dynamic toggle between Login and Registration forms.
 */
const Auth = () => {
  // state to toggle between Login (false) and Register (true) screens
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Section with background image */}
      <div
        className="hidden md:flex md:w-1/2 min-h-screen relative items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant})` }}
      >
        {/* Semi-transparent overlay for text contrast */}
        <div className="absolute inset-0 bg-opacity-40"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white z-10">
          "Serve customers the best food with prompt and friendly service in a
          welcoming atmosphere, and they’ll keep coming back."
          <br />
          <span className="block mt-4 text-yellow-400">
            - Founder of Restro
          </span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 min-h-screen bg-[#1a1a1a] p-6 md:p-10 flex flex-col justify-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Restro Logo"
            className="h-14 w-14 border-2 rounded-full p-1"
          />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Components */}
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <a
              onClick={() => setIsRegister(!isRegister)}
              className="text-yellow-400 font-semibold hover:underline"
              href="#"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
