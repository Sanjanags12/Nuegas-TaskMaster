'use client';

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

export type TaskCardProps = {
  taskName: string;
  category: string;
  image: string;
  percentage: number;
  time: string;
  description?: string;
  teamImages?: string[];
};

const TaskCard: React.FC<TaskCardProps> = ({
  taskName,
  category,
  image,
  percentage,
  time,
  description,
  teamImages = [],
}) => {
  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border">
      {/* Image */}
      <div className="w-full">
        <Image
          src={image}
          alt={taskName}
          width={300}
          height={150}
          className="rounded-md object-cover w-full h-36"
        />
      </div>

      {/* Title, Category, and Description */}
      <div className="mt-2">
        <h2 className="text-base font-semibold text-gray-800 truncate">{taskName}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4 mt-2">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-blue-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <p>Progress</p>
          <p>{percentage}%</p>
        </div>
      </div>

      {/* Time and Team */}
      <div className="flex justify-between items-center pt-2 border-t mt-2">
        <div className="flex items-center text-gray-500 text-xs">
          <Clock className="w-4 h-4 mr-1" />
          {time}
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
