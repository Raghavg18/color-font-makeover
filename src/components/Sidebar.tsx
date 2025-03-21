
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
      className={`bg-dashboard-sidebar min-h-screen transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <h1 className={`text-xl font-bold text-white ${collapsed ? 'hidden' : 'block'}`}>
          Dashboard
        </h1>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/60 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="mt-6">
        <div className={`${collapsed ? 'hidden' : 'block'} px-6 mb-4 text-xs font-semibold text-white/40 uppercase tracking-wider`}>
          Main
        </div>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-3 px-6 transition-colors ${
                location.pathname === item.path
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
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
