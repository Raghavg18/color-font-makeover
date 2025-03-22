
'use client';

import { Card, CardContent } from "@/components/ui/card";
import FilterDialog from "@/components/FilterDialog";
import SortMenu from "@/components/SortMenu";
import { useState } from "react";
import { SortOption } from "@/components/SortMenu";

export default function FreelancersPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('recent');

  const handleSortChange = (sortOption: SortOption) => {
    setCurrentSort(sortOption);
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Freelancers</h1>
        <div className="flex gap-2">
          <FilterDialog onApplyFilters={handleApplyFilters} />
          <SortMenu onSortChange={handleSortChange} currentSort={currentSort} />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p>Freelancer listing will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
