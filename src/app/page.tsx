"use client";

import React from "react";
import { Button } from "~/components/button/button";
import TaskCard from "~/components/cards/taskcard";
import Image from "next/image";
import MentorCard from "~/components/cards/mentorcard";
import RunningTask from "~/components/cards/runningtask";





const newTasks = [
  {
    taskName: "Design Landing Page",
    category: "UI/UX",
    image: "/images/taskimg4.png",
    percentage: 72,
    time: "1 days left",
    teamImages: [
      "/images/profilepic.png",
      "/images/profilepic.png",
      "/images/profilepic.png",
    ],
  },
  {
    taskName: "Fix Payment Bug",
    category: "Backend",
    image: "/images/taskimg5.png",
    percentage: 35,
    time: "3 day left",
    teamImages: [
      "/images/profilepic.png",
      "/images/profilepic.png",
    ],
  },
  {
    taskName: "Create API Docs",
    category: "Documentation",
    image: "/images/taskimg6.png",
    percentage: 88,
    time: "2 days left ",
    teamImages: [
      "/images/profilepic.png",
    ],
  },
   {
    taskName: "Create API Docs",
    category: "Documentation",
    image: "/images/taskimg1.png",
    percentage: 88,
    time: "2 days left ",
    teamImages: [
      "/images/profilepic.png",
    ],
  },
];

const Mentors = [
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


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <div className="flex flex-row justify-between pt-5 mx-5"> 
      <div className ="flex flex-col ">
<h1 className="flex justify-start font-bold text-2xl ">Hi, Skylar Dias</h1>
      <h6 className="flex justify-start font-base"> Let's finish your task today!</h6>
     
      </div>
         
      <div className="flex items-center gap-5 w-auto ">
          <Button className="rounded-full bg-white hover:bg-secondary-100 p-2">
            <Image
              src="/notification.svg"
              alt="notification"
              width={20}
              height={20}
              unoptimized
              className="w-5 h-5"
            />
          </Button>
          <div className=" bg-white hover:shadow-lg rounded-full border">
            <Image
              src="/images/profilepic.png"
              alt="profile"
              width={30}
              height={30}
              unoptimized
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
         </div>
      
      <div className="mt-3">
       
          <div className="flex gap-4 overflow-y-auto pb-4">
            
              <RunningTask completed={40} totalTask={78}  />
            
          </div>
        </div>
      
      <div className="p-4">
       
       <div className="relative">
          
      <h2 className="text-lg font-semibold mb-2">Recent Mentors</h2>
      <div className="flex items-center gap-4  pb-4">
        {Mentors.map((mentor, idx) => (
          <div key={`recent-${idx}`} className="min-w-[280px] max-w-sm">
            <MentorCard {...mentor} hideDescription />
          </div>
        ))}
      </div>
      </div>

        {/* New Tasks */}
        <div className="mt-3">
          <h2 className="text-lg font-semibold mb-2">New Tasks</h2>
          <div className="flex gap-4 overflow-y-auto pb-4">
            {newTasks.map((task, idx) => (
              <TaskCard key={`new-task-${idx}`} {...task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
