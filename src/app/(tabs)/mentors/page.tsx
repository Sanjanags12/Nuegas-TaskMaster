'use client';

import React from "react";
import Navbar from "~/components/navbar/navbar";
import MentorCard from "~/components/cards/mentorcard";
import { ChevronLeft, ChevronRight } from "lucide-react";


const recentMentors = [
  {
  profile:"/images/profilepic.png",
  mentorName:"Jessica Jane",
  designation:"Web Developer",
  description:"EHi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . . ",
  tasks:"40 Tasks",
  rating:4.7,
  },
 {
     profile:"/images/image.png",
  mentorName:"Stanton",
  designation:"UI/UX Designer",
  description:"Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX  . . . ",
  tasks:"60 Tasks",
  rating:4.9,
  },
  {
     profile:"/images/profilepic.png",
  mentorName:"Jane Doe",
  designation:"Senior Analyst",
  description:"Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX  . . . ",
  tasks:"50 Tasks",
  rating:4.8,
  },
 
];


const mentors = [
  ...recentMentors,
{
  profile:"/images/profilepic.png",
  mentorName:"Jessica Jane",
  designation:"Web Developer",
  description:"EHi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . . ",
  tasks:"40 Tasks",
  rating:4.7,
  },
 {
  profile:"/images/profilepic.png",
  mentorName:"Jessica Jane",
  designation:"Web Developer",
  description:"EHi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . . ",
  tasks:"40 Tasks",
  rating:4.7,
  },
   {
     profile:"/images/profile1.png",
  mentorName:"Jane Doe",
  designation:"Senior Developer",
  description:"Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX  . . . ",
  tasks:"50 Tasks",
  rating:4.8,
  },
];

const Mentors = () => {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar
       title="Explore Mentors"
  searchPlaceholder="Search Mentors"
  context="mentor"
  categories={["Frontend", "Backend", "AI", "DevOps"]}
  onFilterChange={({ category, sort, searchQuery }) => {
    console.log("Filters:", category, sort, searchQuery);
    // Apply your filtering logic to a mentor or task list here
  }}
/>
      <div className="p-4">

         <div className="relative">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ">
        <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <ChevronRight className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
      
         <div className="relative">
          
      <h2 className="text-lg font-semibold mb-2">Recent Mentors</h2>
      <div className="flex items-center gap-4  pb-4">
        {recentMentors.map((mentor, idx) => (
          <div key={`recent-${idx}`} className="min-w-[280px] max-w-sm">
            <MentorCard {...mentor} hideDescription />
          </div>
        ))}
      </div>
      </div>
    </div>

        <div className="mt-3">
      <h2 className="text-lg font-semibold mb-2">Mentors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 ">
        {mentors.map((mentor, idx) => (
          <div key={`mentor-${idx}`} className="min-w-sm">
            <MentorCard {...mentor} />
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default Mentors ;
