"use client";

import React, { useState } from "react";
import { Button } from "~/components/button/button";
import TaskCard, { TaskCardProps } from "~/components/cards/taskcard";
import Image from "next/image";
import MentorCard, { MentorCardProps } from "~/components/cards/mentorcard";
import RunningTask from "~/components/cards/runningtask";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetTasks } from "~/services/get-tasks";
import { useGetMentors } from "~/services/get-mentor";
import { useGetUser } from "~/services/get-user";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VISIBLE_COUNT = 2;

const OverView = () => {
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError } = useGetTasks();
  const { data: mentors = [], isLoading: mentorsLoading, error: mentorsError } = useGetMentors();
  const { data: user } = useGetUser();

  const [mentorStartIndex, setMentorStartIndex] = useState(0);
  const [taskStartIndex, setTaskStartIndex] = useState(0);

  const chartData = tasks.map((task: any) => ({
    name: task?.week ?? "Week",
    count: task?.taskCount ?? 0,
  }));

  const scrollCards = (type: "mentor" | "task", direction: "left" | "right") => {
    const dataList = type === "mentor" ? mentors : tasks;
    const startIndex = type === "mentor" ? mentorStartIndex : taskStartIndex;

    let newIndex =
      direction === "right"
        ? startIndex + VISIBLE_COUNT
        : startIndex - VISIBLE_COUNT;

    newIndex = Math.max(0, Math.min(dataList.length - VISIBLE_COUNT, newIndex));

    if (type === "mentor") setMentorStartIndex(newIndex);
    else setTaskStartIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden w-full px-4 sm:px-8 pb-5">
      {/* Header */}
      <div className="flex flex-row justify-between pt-5">
        <div>
          <h1 className="font-bold text-2xl">Hi, {user?.name || "Guest"}</h1>
          <h6 className="text-base text-gray-700">Let's finish your tasks today!</h6>
        </div>
        <div className="flex items-center gap-5">
          <Button className="rounded-full bg-white hover:bg-secondary-100 p-2">
            <Image src="/notification.svg" alt="notification" width={20} height={20} unoptimized />
          </Button>
          <div className="bg-white hover:shadow-lg rounded-full border">
            <Image
              src="/images/profilepic.png"
              alt="profile"
              width={40}
              height={40}
              unoptimized
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Running Task + Chart */}
      <div className="mt-5 flex flex-col lg:flex-row gap-4">
        <RunningTask completed={40} totalTask={78} />
        <div className="w-full lg:w-1/2 h-[200px] bg-white rounded-md shadow-md p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mentor Cards */}
<div className="mt-8">
  <div className="flex justify-between items-center mb-2">
    <h2 className="text-lg font-semibold">Recent Mentors</h2>
    <div className="flex gap-2">
      <ChevronLeft
        className="cursor-pointer"
        onClick={() => scrollCards("mentor", "left")}
      />
      <ChevronRight
        className="cursor-pointer"
        onClick={() => scrollCards("mentor", "right")}
      />
    </div>
  </div>
  <div className="w-full overflow-hidden">
    <div className="flex gap-4 transition-transform duration-300">
      {mentors
        .slice(mentorStartIndex, mentorStartIndex + VISIBLE_COUNT)
        .map((mentor: any, idx) => {
          const mappedMentor: MentorCardProps = {
            mentorName: mentor.name,
            designation: mentor.designation,
            tasks: mentor.taskCount ?? 0,
            rating: mentor.rating ?? 0,
            profile: mentor.profile ?? "",
            description: mentor.description ?? "",
          };

          return (
            <div key={`mentor-${idx}`} className="flex-1 min-w-[48%]">
              <MentorCard {...mappedMentor} hideDescription />
            </div>
          );
        })}
    </div>
  </div>
</div>


      {/* Task Cards */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">New Tasks</h2>
          <div className="flex gap-2">
            <ChevronLeft className="cursor-pointer" onClick={() => scrollCards("task", "left")} />
            <ChevronRight className="cursor-pointer" onClick={() => scrollCards("task", "right")} />
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex gap-4 transition-transform duration-300">
            {tasks
              .slice(taskStartIndex, taskStartIndex + VISIBLE_COUNT)
              .map((task: TaskCardProps, idx) => (
                <div key={`task-${idx}`} className="flex-1 min-w-[48%]">
                  <TaskCard {...task} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
