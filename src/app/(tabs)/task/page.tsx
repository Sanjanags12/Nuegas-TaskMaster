'use client';

import React from "react";
import Navbar from "~/components/navbar/navbar";
import TaskCard from "~/components/cards/taskcard";
import { useGetTasks } from "~/services/get-tasks";

const Task = () => {
  const { data: tasks, isLoading, isError } = useGetTasks();

  // Split into time-limited and new tasks using simple string matching
  const timeLimitTasks = tasks?.filter(
    (task) =>
      task.time.toLowerCase().includes("hour") ||
      task.time.toLowerCase().includes("day")
  ) || [];

  const newTasks = tasks?.filter(
    (task) => task.time.toLowerCase().includes("left")
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        context="task"
        categories={[]}
        onFilterChange={() => {}}
      />

      <div className="p-4">
        {isLoading && <p className="text-gray-500">Loading tasks...</p>}
        {isError && <p className="text-red-500">Failed to load tasks.</p>}

        {!isLoading && !isError && (
          <>
            {/* Time-Limit Tasks Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Time-Limit</h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {timeLimitTasks.map((task, idx) => (
                  <TaskCard key={`time-task-${idx}`} {...task} />
                ))}
              </div>
            </div>

            {/* New Tasks Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">New Tasks</h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {newTasks.map((task, idx) => (
                  <TaskCard key={`new-task-${idx}`} {...task} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
