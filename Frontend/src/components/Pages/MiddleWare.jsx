import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem("auth_token");

      if (!token) {
        navigate("/login");
        return false;
      }

      return true;
    };

    checkAuth();
  }, [navigate]);

  const token = sessionStorage.getItem("auth_token");

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return children;
}
