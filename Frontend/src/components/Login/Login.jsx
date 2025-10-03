import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {LoginApp} from "../../../app/service/authService";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await LoginApp(email, password);

        sessionStorage.setItem("auth_token", res.data.access_token);

        resolve("Login berhasil! Mengarahkan ke dashboard...");
        setTimeout(() => navigate("/admin"), 1500);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Email atau password salah!";
        reject(errorMessage);
        setMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    });

    toast.promise(loginPromise, {
      loading: "Sedang masuk...",
      success: (msg) => msg,
      error: (err) => err,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 px-10 py-16 rounded-2xl shadow-xl w-96"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Silakan login untuk melanjutkan
        </p>

        {/* Email Input */}
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 p-2 pl-10 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        {/* Error Message */}
        {message && (
          <p className="text-red-500 mt-3 text-sm text-center">{message}</p>
        )}
      </form>
      <Toaster position="top-center" />
    </div>
  );
}
