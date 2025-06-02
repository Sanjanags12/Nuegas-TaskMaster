"use client";

import React from "react";
import Image from "next/image";
import { UserPlus, ThermometerSnowflake, Star, Tags } from "lucide-react";

export type MentorCardProps = {
  profile: string;
  mentorName: string;
  designation: string;
  description: string;
  tasks: string;
  rating: number | string;
   hideDescription?: boolean;
};

const MentorCard: React.FC<MentorCardProps> = ({
  profile,
  mentorName,
  designation,
  description,
  tasks,
  rating,
  hideDescription = false,
}) => {
  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 ">
   
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <Image
            src={profile}
            alt="profile"
            width={50}
              height={50}
              className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-base font-semibold text-gray-800 truncate">
              {mentorName}
            </h2>
            <p className="text-sm text-secondary-400">{designation}</p>
          </div>
        </div>

        <UserPlus className="w-5 h-5 text-primary-500 hover:text-primary-700 cursor-pointer" />
      </div>

       {!hideDescription && (
        <p className="mt-4 text-sm text-gray-500 line-clamp-3">{description}</p>
      )}

  
      <div className="flex justify-between items-center pt-3 mt-3 ">
        <div className="flex items-center  text-secondary-400 text-sm">
          <Image className="w-4 h-4 mr-1" height={15} width={15} src="/task2.svg" alt="taskcard" />
          {tasks}
        </div>
        <div className="flex items-center text-secondary-500 text-sm">
          <Star className="w-4 h-4 mr-1 text-yellow-500" />
          {rating}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
