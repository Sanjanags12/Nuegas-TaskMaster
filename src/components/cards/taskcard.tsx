import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

export type TaskCardProps = {
  taskName: string;
  category: string;
  image: string;
  percentage: number;
  time: string;
  teamImages: string[];
};

const TaskCard: React.FC<TaskCardProps> = ({
  taskName,
  category,
  image,
  percentage,
  time,
  teamImages
}) => {
  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border">
      {/* Top Section */}
      <div className="flex-row items-center ">
        <Image
          src={image}
          alt="Task Icon"
          width={300}
          height={150}
          className="rounded-md object-cover"
        />
        <div>
          <h2 className="mt-2 text-base font-semibold text-secondary-500 truncate">{taskName}</h2>
          <p className="text-sm text-secondary-400">{category}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 mt-2">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            
          <div
            className={
              "h-2 rounded-full transition-all duration-300 bg-primary-500"}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-primary-500 mt-1 flex justify-between gap-3">
              <p className=" text-sm text-secondary-400">Progress</p>
            {percentage}% </div>
      </div>

      {/* Footer: Time + Team */}
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
              alt={`Person ${idx}`}
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
