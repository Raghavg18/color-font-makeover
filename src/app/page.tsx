
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/SalesChart";
import { StatCard } from "@/components/StatCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <Link href="/freelancers">View Freelancers</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" trend="up" percentage="34.7%" />
        <StatCard title="Active Freelancers" value="2,431" trend="up" percentage="12.2%" />
        <StatCard title="New Employers" value="456" trend="down" percentage="9.1%" />
        <StatCard title="Completed Jobs" value="12,436" trend="up" percentage="18.5%" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>
    </div>
  );
}
