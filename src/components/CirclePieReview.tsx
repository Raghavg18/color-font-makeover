
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CirclePieReviewProps {
  title: string;
  rating: number; // Rating out of 5
  count: number; // Number of reviews
  className?: string;
  color?: string;
}

const CirclePieReview = ({
  title,
  rating,
  count,
  className,
  color = "#8B5CF6", // Default purple color
}: CirclePieReviewProps) => {
  // Convert rating out of 5 to a percentage
  const percentage = (rating / 5) * 100;
  
  return (
    <Card className={cn("dashboard-card", className)}>
      <CardContent className="p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        
        <div className="relative w-36 h-36 flex items-center justify-center mb-4">
          {/* Circular progress background */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E5DEFF"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeDasharray={`${percentage * 2.83} ${283 - percentage * 2.83}`}
                strokeDashoffset="70.75"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
          
          {/* Rating value */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold" style={{ color }}>{rating.toFixed(1)}</span>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(rating) ? "fill-current text-yellow-400" : "text-gray-300"}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
        </div>
        
        <span className="text-sm text-gray-500">{count} reviews</span>
      </CardContent>
    </Card>
  );
};

export default CirclePieReview;
