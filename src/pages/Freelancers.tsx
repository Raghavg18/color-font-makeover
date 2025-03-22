
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import FilterDialog from '../components/FilterDialog';
import SortMenu, { SortOption } from '../components/SortMenu';
import { Star, Clock, DollarSign } from 'lucide-react';

interface Freelancer {
  id: number;
  name: string;
  avatar: string;
  skills: string[];
  rating: number;
  hourlyRate: number;
  projectsCompleted: number;
  location: string;
  lastActive: string;
}

interface FilterOptions {
  minRate: number | '';
  maxRate: number | '';
  minRating: number | '';
  lastActive: string;
}

const mockFreelancers: Freelancer[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    skills: ["React", "TypeScript", "UI/UX"],
    rating: 4.9,
    hourlyRate: 85,
    projectsCompleted: 32,
    location: "Berlin, Germany",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Sam Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["Python", "Django", "React"],
    rating: 4.7,
    hourlyRate: 75,
    projectsCompleted: 28,
    location: "Toronto, Canada",
    lastActive: "Just now"
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    skills: ["UI Design", "Figma", "Webflow"],
    rating: 4.8,
    hourlyRate: 90,
    projectsCompleted: 45,
    location: "Barcelona, Spain",
    lastActive: "1 day ago"
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    skills: ["Node.js", "Express", "MongoDB"],
    rating: 4.6,
    hourlyRate: 70,
    projectsCompleted: 19,
    location: "Seoul, South Korea",
    lastActive: "3 hours ago"
  },
  {
    id: 5,
    name: "Olivia Wilson",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    skills: ["Vue.js", "Firebase", "TailwindCSS"],
    rating: 4.9,
    hourlyRate: 85,
    projectsCompleted: 37,
    location: "Melbourne, Australia",
    lastActive: "5 hours ago"
  }
];

const isWithinTimeframe = (lastActive: string, timeframe: string): boolean => {
  if (timeframe === 'any') return true;
  
  if (lastActive === 'Just now') return true;
  
  if (timeframe === 'day') {
    return lastActive.includes('hour') || lastActive === 'Just now';
  }
  
  if (timeframe === 'week') {
    return lastActive.includes('hour') || 
           lastActive.includes('day') && parseInt(lastActive) <= 7 || 
           lastActive === 'Just now';
  }
  
  return true;
};

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFreelancers, setAllFreelancers] = useState<Freelancer[]>([]);
  const [displayedFreelancers, setDisplayedFreelancers] = useState<Freelancer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState<SortOption>('rating-desc');
  const [filters, setFilters] = useState<FilterOptions>({
    minRate: '',
    maxRate: '',
    minRating: '',
    lastActive: 'any'
  });
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAllFreelancers(mockFreelancers);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let filtered = [...allFreelancers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (freelancer) => freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply additional filters
    if (filters.minRate !== '') {
      filtered = filtered.filter(freelancer => freelancer.hourlyRate >= Number(filters.minRate));
    }
    
    if (filters.maxRate !== '') {
      filtered = filtered.filter(freelancer => freelancer.hourlyRate <= Number(filters.maxRate));
    }
    
    if (filters.minRating !== '') {
      filtered = filtered.filter(freelancer => freelancer.rating >= Number(filters.minRating));
    }
    
    if (filters.lastActive !== 'any') {
      filtered = filtered.filter(freelancer => 
        isWithinTimeframe(freelancer.lastActive, filters.lastActive)
      );
    }
    
    // Apply sorting
    switch (currentSort) {
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'hourly-desc':
        filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'hourly-asc':
        filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'recent':
        // This is a simple approximation since we'd need actual timestamps
        filtered.sort((a, b) => {
          if (a.lastActive === 'Just now') return -1;
          if (b.lastActive === 'Just now') return 1;
          if (a.lastActive.includes('hour') && b.lastActive.includes('day')) return -1;
          if (b.lastActive.includes('hour') && a.lastActive.includes('day')) return 1;
          return 0;
        });
        break;
    }
    
    setDisplayedFreelancers(filtered);
  }, [allFreelancers, searchTerm, filters, currentSort]);
  
  const handleFilterApply = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (sortOption: SortOption) => {
    setCurrentSort(sortOption);
  };

  return (
    <div className="flex min-h-screen bg-dashboard-dark">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">Freelancers</h1>
          <p className="text-gray-500 animate-slide-in">Browse and manage freelancers on your platform.</p>
        </div>
        
        <div className="dashboard-card mb-8" style={{ '--animation-order': 0 } as React.CSSProperties}>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search freelancers by name or skills..." 
                className="bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <FilterDialog onApplyFilters={handleFilterApply} />
            <SortMenu onSortChange={handleSortChange} currentSort={currentSort} />
          </div>
        </div>
        
        {isLoading ? (
          <div className="dashboard-card flex items-center justify-center h-64" style={{ '--animation-order': 1 } as React.CSSProperties}>
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
              <div className="h-4 w-56 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : displayedFreelancers.length === 0 ? (
          <div className="dashboard-card flex flex-col items-center justify-center h-64 text-center" style={{ '--animation-order': 1 } as React.CSSProperties}>
            <div className="text-gray-400 mb-2">
              <Search size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-700">No freelancers found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedFreelancers.map((freelancer, index) => (
              <div 
                key={freelancer.id} 
                className="dashboard-card hover:border hover:border-gray-200 cursor-pointer" 
                style={{ '--animation-order': index + 1 } as React.CSSProperties}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img 
                    src={freelancer.avatar} 
                    alt={freelancer.name} 
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{freelancer.name}</h3>
                    <div className="text-gray-500 mb-2">{freelancer.location}</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {freelancer.skills.map((skill) => (
                        <span key={skill} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-yellow-500 mb-1">
                        <Star size={16} className="fill-current" />
                        <span className="ml-1 font-medium">{freelancer.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-green-500 mb-1">
                        <DollarSign size={16} />
                        <span className="font-medium">{freelancer.hourlyRate}</span>
                      </div>
                      <div className="text-xs text-gray-500">Hourly</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-blue-500 mb-1">
                        <Clock size={16} />
                        <span className="ml-1 text-gray-700 text-sm">{freelancer.lastActive}</span>
                      </div>
                      <div className="text-xs text-gray-500">Last active</div>
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

export default Freelancers;
