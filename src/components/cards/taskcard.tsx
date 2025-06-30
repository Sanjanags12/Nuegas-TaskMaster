'use client';

import React from "react";
import Image from "next/image";
import { Clock, Star } from "lucide-react";

export type TaskCardProps = {
  _id: string;
  title: string;
  category: string;
  description?: string;
  displayMedia: string;
  timeToComplete:Number;
  createdAt?: string;

  createdBy: {
    name: string;
    ratings: number;
  };
  
  progress?: number;
  status?: string;
  teamImages?: string[];
};

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  title,
  category,
  description,
  displayMedia,
  createdAt,
  timeToComplete,
  createdBy,
  progress = 50,
  status = "in-progress",
  teamImages = [],
}) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "No Date";

  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border">
      {/* Image */}
      <div className="w-full h-36 bg-gray-100 rounded-md overflow-hidden relative">
        <Image
          src={displayMedia}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Task info */}
      <div className="mt-2">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-500 capitalize"> {category}</p>
        
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4 mt-2">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <p>Progress</p>
          <p>{progress}%</p>
        </div>
      </div>

      {/* Created date and team images */}
      <div className="flex justify-between items-center pt-2 border-t mt-2">
        <div className="flex items-center text-gray-500 text-xs">
          <Clock className="w-4 h-4 mr-1" />
          {formattedDate}
        </div>
        <div className="flex -space-x-2">
          {teamImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Team member ${idx + 1}`}
              width={24}
              height={24}
              className="rounded-full border-2 border-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
