
import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Building, MapPin, Briefcase } from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface Employer {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  openJobs: number;
  activeProjects: number;
  totalSpent: string;
  joinedDate: string;
}

const mockEmployers: Employer[] = [
  {
    id: 1,
    name: "Acme Technologies",
    logo: "https://ui-avatars.com/api/?name=Acme+Technologies&background=0D8ABC&color=fff",
    industry: "Software Development",
    location: "San Francisco, CA",
    openJobs: 12,
    activeProjects: 8,
    totalSpent: "$142,500",
    joinedDate: "Jun 2021"
  },
  {
    id: 2,
    name: "Globex Corporation",
    logo: "https://ui-avatars.com/api/?name=Globex+Corporation&background=11493E&color=fff",
    industry: "E-commerce",
    location: "New York, NY",
    openJobs: 7,
    activeProjects: 5,
    totalSpent: "$98,750",
    joinedDate: "Aug 2021"
  },
  {
    id: 3,
    name: "Soylent Corp",
    logo: "https://ui-avatars.com/api/?name=Soylent+Corp&background=6C3483&color=fff",
    industry: "Marketing & Design",
    location: "Chicago, IL",
    openJobs: 4,
    activeProjects: 3,
    totalSpent: "$67,230",
    joinedDate: "Nov 2021"
  },
  {
    id: 4,
    name: "Massive Dynamics",
    logo: "https://ui-avatars.com/api/?name=Massive+Dynamics&background=7D3C98&color=fff",
    industry: "Hardware Manufacturing",
    location: "Seattle, WA",
    openJobs: 9,
    activeProjects: 4,
    totalSpent: "$215,800",
    joinedDate: "Feb 2021"
  },
  {
    id: 5,
    name: "Initech",
    logo: "https://ui-avatars.com/api/?name=Initech&background=0E6655&color=fff",
    industry: "Financial Services",
    location: "Austin, TX",
    openJobs: 5,
    activeProjects: 2,
    totalSpent: "$43,500",
    joinedDate: "Jan 2022"
  }
];

const Employers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setEmployers(mockEmployers);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredEmployers = employers.filter(
    (employer) => employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employer.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-dashboard-dark">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white/90 mb-2 animate-fade-in">Employers</h1>
          <p className="text-white/60 animate-slide-in">Browse and manage employers using your platform.</p>
        </div>
        
        <div className="dashboard-card mb-8" style={{ '--animation-order': 0 } as React.CSSProperties}>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text"
                placeholder="Search employers by name, industry or location..." 
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 w-full text-white/80 focus:outline-none focus:ring-2 focus:ring-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-lg py-2 px-4">
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-lg py-2 px-4">
              <ArrowUpDown size={18} />
              <span>Sort</span>
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="dashboard-card flex items-center justify-center h-64" style={{ '--animation-order': 1 } as React.CSSProperties}>
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-48 bg-white/5 rounded"></div>
              <div className="h-4 w-64 bg-white/5 rounded"></div>
              <div className="h-4 w-56 bg-white/5 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEmployers.map((employer, index) => (
              <div 
                key={employer.id} 
                className="dashboard-card hover:border hover:border-white/10 cursor-pointer" 
                style={{ '--animation-order': index + 1 } as React.CSSProperties}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img 
                    src={employer.logo} 
                    alt={employer.name} 
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{employer.name}</h3>
                    <div className="flex items-center text-white/60 mb-1">
                      <Building size={16} className="mr-2" />
                      {employer.industry}
                    </div>
                    <div className="flex items-center text-white/60 mb-2">
                      <MapPin size={16} className="mr-2" />
                      {employer.location}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                      <div className="text-blue-400 font-medium">{employer.openJobs}</div>
                      <div className="text-xs text-white/60">Open Jobs</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                      <div className="text-purple-400 font-medium">{employer.activeProjects}</div>
                      <div className="text-xs text-white/60">Active Projects</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                      <div className="text-green-500 font-medium">{employer.totalSpent}</div>
                      <div className="text-xs text-white/60">Total Spent</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center text-white/80">
                        <Briefcase size={14} className="mr-1" />
                        <span>{employer.joinedDate}</span>
                      </div>
                      <div className="text-xs text-white/60">Member Since</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employers;
