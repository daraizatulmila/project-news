import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Logout } from "../../../app/service/authService";

export default function HeaderDashboard() {
  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar dari sistem?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#1630f9ff",
      cancelButtonColor: "#6b6d80ff",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          toast.loading("Sedang proses logout...");
          
          await Logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          sessionStorage.removeItem("token");          
          toast.success("Logout berhasil!", {
            duration: 2000,
          });

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      }
    });
  };

  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="font-bold text-gray-700">News Management</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-blue-200 text-white hover:bg-blue-400 transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
}