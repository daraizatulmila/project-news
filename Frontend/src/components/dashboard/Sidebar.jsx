import { PlusCircle, FileText } from "lucide-react";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const menuItems = [
    {
      id: "create",
      label: "Create Berita",
      icon: PlusCircle,
      description: "Buat berita baru",
    },
    {
      id: "list",
      label: "List Berita",
      icon: FileText,
      description: "Kelola berita existing",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-orange-500 mb-1">Admin Panel</h2>
        <p className="text-sm text-gray-500">Dashboard Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-start gap-3 w-full p-3 rounded-xl text-left ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:border-orange-200"
              }`}
            >
              <Icon
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-orange-500"
                }`}
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                <div
                  className={`text-xs mt-0.5 ${
                    isActive ? "text-orange-100" : "text-gray-500"
                  }`}
                >
                  {/* {item.description} */}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2024 DKV Admin
        </div>
      </div>
    </aside>
  );
}
