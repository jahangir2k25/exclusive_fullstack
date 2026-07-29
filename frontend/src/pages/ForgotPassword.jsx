import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import SignupImg from "../assets/signupimg.png";
import { NavLink } from "react-router";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/forgot-password`,
        {
          email: email
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword();

    if (!email) {
      setError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(""); // Clear any previous error messages
    setLoading(true);

    try {
      forgotPassword();
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      setLoading(false);
      setSuccess("Password reset link sent successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="mt-5 lg:mt-20">
          <BreadCrumb />
        </div>
        <div className="mt-5 lg:mt-15 flex">
          <div className="absolute left-0">
            <img
              src={SignupImg}
              alt="#"
              className="h-80 lg:h-125.25 opacity-15 lg:opacity-100 lg:flex"
            />
          </div>
          <div className="pl-5 lg:pl-187.25 lg:mt-31.25 z-1">
            <h4 className="text-[36px] font-medium font-inter">
              Forgot Password
            </h4>
            <p className="font-poppins mt-6">
              Enter your email and we will send a reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-12">
              <div className="mb-10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border-b-2 border-secondary w-92.5 h-8 py-2 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white px-33 py-4 bg-primary hover:bg-[#d60303] duration-300 rounded-sm cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>

            <div className="flex gap-2 items-center mt-8 text-center justify-center">
              <p>Remember your password?</p>
              <NavLink to="/login" className="hover:border-b-1 hover:border-black font-medium">
                Log in
              </NavLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
