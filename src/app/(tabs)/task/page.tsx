

import React from "react";
import Navbar from "~/components/navbar/navbar";
import TaskCard from "~/components/cards/taskcard";


const TimelimitTasks = [
  {
    taskName: "Design Landing Page",
    category: "UI/UX",
    image: "/images/taskimg1.png",
    percentage: 72,
    time: "3 hours",
    teamImages: [
      "/images/profilepic.png",
      "/images/profilepic.png",
      "/images/profilepic.png",
    ],
  },
  {
    taskName: "Fix Payment Bug",
    category: "Backend",
    image: "/images/taskimg2.png",
    percentage: 35,
    time: "1 hour",
    teamImages: [
      "/images/profilepic.png",
      "/images/profilepic.png",
    ],
  },
  {
    taskName: "Create API Docs",
    category: "Documentation",
    image: "/images/taskimg3.png",
    percentage: 88,
    time: "2 days ",
    teamImages: [
      "/images/profilepic.png",
    ],
  },
  {
    taskName: "Create API Docs",
    category: "Documentation",
    image: "/images/taskimg5.png",
    percentage: 88,
    time: "2 days ",
    teamImages: [
      "/images/profilepic.png",
    ],
  },
];


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

const Task = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        title="Explore Task" 
        searchPlaceholder="Search task"
      />
      <div className="p-4">
       

        {/* Time Limit*/}
        <div>
          <h2 className="text-lg font-semibold mb-2">Time-Limit</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {TimelimitTasks.map((task, idx) => (
              <TaskCard key={`time-task-${idx}`} {...task} />
            ))}
          </div>
        </div>

        {/* New Tasks */}
        <div className="mt-3">
          <h2 className="text-lg font-semibold mb-2">New Tasks</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {newTasks.map((task, idx) => (
              <TaskCard key={`new-task-${idx}`} {...task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
