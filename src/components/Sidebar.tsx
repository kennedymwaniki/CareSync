import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiBell, FiSettings, FiChevronDown } from "react-icons/fi";
// Import React Icons

interface SidebarProps {
  navigation: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
  }[];
}

const Sidebar = ({ navigation }: SidebarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <aside className="w-64 bg-white shadow-xl min-h-screen flex flex-col justify-between border-r">
      <div>
        <div className="flex items-center justify-center py-4">
          <h1 className="text-black font-bold text-xl">CareSync+</h1>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-[#454ae756] text-[#454BE7]"
                      : "text-black hover:bg-[#454ae756] hover:text-[#454BE7]"
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-48 px-2 space-y-1">
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `group flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-[#454ae756] text-[#454BE7]"
                  : "text-black hover:bg-[#454ae756] hover:text-[#454BE7]"
              }`
            }
          >
            <FiBell className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="flex-1">Notifications</span>
            <span className="mx-auto text-xs bg-blue-600 text-white rounded-full px-2 py-0.5 ">
              2
            </span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-[#454ae756] text-[#454BE7]"
                  : "text-black hover:bg-[#454ae756] hover:text-[#454BE7]"
              }`
            }
          >
            <FiSettings className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="flex-1">Settings</span>
          </NavLink>
        </div>
      </div>

      <div className="px-4 py-3 border-gray-700 mb-8">
        <div className="flex items-center border border-black p-4 rounded-md">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-black">Yusuf Juma</p>
            <p className="text-xs text-gray-400">@yusuf</p>
          </div>
          <button
            className="ml-auto text-gray-300 hover:text-white"
            onClick={toggleDropdown}
          >
            <FiChevronDown className="h-5 w-5" />
          </button>
        </div>
        {dropdownOpen && (
          <div className="mt-2 bg-gray-800 rounded-md shadow-lg overflow-hidden">
            <NavLink
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Profile
            </NavLink>
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => console.log("Logout clicked")}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
