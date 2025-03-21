
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: '/', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/freelancers', label: 'Freelancers', icon: <Users size={20} /> },
    { path: '/employers', label: 'Employers', icon: <Briefcase size={20} /> },
  ];

  return (
    <div 
      className={`bg-dashboard-sidebar min-h-screen transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-6 flex items-center justify-between border-b border-gray-200">
        <h1 className={`text-xl font-bold text-gray-800 ${collapsed ? 'hidden' : 'block'}`}>
          Dashboard
        </h1>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="mt-6">
        <div className={`${collapsed ? 'hidden' : 'block'} px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider`}>
          Main
        </div>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-3 px-6 transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className={`${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
