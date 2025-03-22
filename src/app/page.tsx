
'use client';

import { Card, CardContent } from "@/components/ui/card";
import SalesChart from "@/components/SalesChart";
import StatCard from "@/components/StatCard";
import { BarChart4, Users, Briefcase, DollarSign } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Freelancers" value="1,234" trend="up" percentage="12" icon={<Users size={20} />} />
        <StatCard title="Active Projects" value="89" trend="up" percentage="7" icon={<Briefcase size={20} />} />
        <StatCard title="Completed Projects" value="642" trend="down" percentage="2" icon={<BarChart4 size={20} />} />
        <StatCard title="Total Revenue" value="$12,345" trend="up" percentage="23" icon={<DollarSign size={20} />} />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <SalesChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
