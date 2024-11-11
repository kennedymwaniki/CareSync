import { Bell, Settings, LogOut } from "lucide-react";

const TopBar = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 t`o-secondary-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">
              Grace Memorial Services
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-white/80 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/80 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white">Hello</span>
              <button className="p-2 text-white/80 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default TopBar;
