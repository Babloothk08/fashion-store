import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import publicApi from "../pages/api/publicApi.js"

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=enter email, 2=enter otp, 3=new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate()

  // 1️⃣ Send OTP
  const handleSendOTP = async () => {
    try {
      const res = await publicApi.post("/api/forgot-password", { email });
      toast.success(res.data.message);
      setStep(2);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const res = await publicApi.post("/api/verify-otp", { email, otp });
      toast.success(res.data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // 3️⃣ Reset Password
  const handleResetPassword = async () => {
    try {
      const res = await publicApi.post("/api/reset-password", { email, newPassword });
      toast.success(res.data.message);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      navigate('/')  
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[400px]">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 ">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="border w-full p-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-blue-600 text-white w-full p-2 rounded cursor-pointer" onClick={handleSendOTP}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 ">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border w-full p-2 mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="bg-green-600 text-white w-full p-2 rounded cursor-pointer" onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              className="border w-full p-2 mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="bg-purple-600 text-white w-full p-2 rounded cursor-pointer" onClick={handleResetPassword}>
              Reset Password
            </button>
          </>
        )}
      </div>

      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default ForgotPassword;
