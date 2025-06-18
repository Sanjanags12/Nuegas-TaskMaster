'use client';

import React from "react";
import Image from "next/image";
import { UserPlus, Star } from "lucide-react";

export type MentorCardProps = {
  mentorName: string;
  designation: string;
  tasks: number;           
  rating: number | string;
  profile?: string;       
  hideDescription?: boolean;
  description?: string;   
};

const MentorCard: React.FC<MentorCardProps> = ({
  profile,
  mentorName,
  designation,
  tasks,
  rating,
  hideDescription = false,
  description = "",
}) => {
  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          {profile ? (
            <Image
              src={profile}
              alt={`${mentorName} profile`}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-lg uppercase">
              {mentorName}
            </div>
          )}
          <div>
            <h2 className="text-base font-semibold text-gray-800 truncate">
              {mentorName}
            </h2>
            <p className="text-sm text-secondary-400">{designation}</p>
          </div>
        </div>

        <UserPlus className="w-5 h-5 text-primary-500 hover:text-primary-700 cursor-pointer" />
      </div>

      {!hideDescription && description && (
        <p className="mt-4 text-sm text-gray-500 line-clamp-3">{description}</p>
      )}

      <div className="flex justify-between items-center pt-3 mt-3 ">
        <div className="flex items-center text-secondary-400 text-sm">
          <Image
            className="w-4 h-4 mr-1"
            height={15}
            width={15}
            src="/task2.svg"
            alt="taskcard"
            unoptimized
          />
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
