
'use client';

import { Card, CardContent } from "@/components/ui/card";

export default function FreelancersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Freelancers</h1>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p>Freelancer listing will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
