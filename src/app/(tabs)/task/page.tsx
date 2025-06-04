"use client";

import React, { useState, useRef } from "react";
import Navbar from "~/components/navbar/navbar";
import TaskCard from "~/components/cards/taskcard";
import { useGetTasks } from "~/services/get-tasks";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

// Sorting options
const sortOptionsMap = {
  task: ["All", "Deadline"],
  mentor: ["All", "Popularity"],
};

const Task = () => {
  const { data: response, isLoading, isError } = useGetTasks();
  const tasks = response?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("All");

  const timeLimitRef = useRef<HTMLDivElement>(null);
  const newTasksRef = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const scrollAmount = ref.current.offsetWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const categories = Array.from(
    new Set(tasks?.map((task) => task.category).filter(Boolean))
  );

  const filteredByCategory = tasks.filter((task) =>
    category === "All" ? true : task.category === category
  );

  const filteredBySearch = filteredByCategory.filter((task) =>
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = filteredBySearch.slice().sort((a, b) => {
    if (sort === "Deadline") {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    }
    return 0;
  });

  const timeLimitTasks = sortedTasks.filter(
    (task) =>
      task.time.toLowerCase().includes("hour") ||
      task.time.toLowerCase().includes("day")
  );

  const newTasks = sortedTasks.filter((task) =>
    task.time.toLowerCase().includes("left")
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar title="Explore Tasks" context="task" />
      <div className="max-w-screen-xl mx-auto bg-secondary-200">
        <div className="p-4 bg-white">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            {/* Search */}
            <div className="flex items-center w-full sm:max-w-md bg-white border border-gray-300 rounded-lg px-4 py-2">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none placeholder-secondary-200 text-secondary-400 text-sm"
              />
              <Search className="h-5 w-5 text-gray-400 ml-2" />
            </div>

            {/* Category + Sort */}
            <div className="flex gap-4 sm:gap-6 items-center">
              {/* Category */}
              <div className="flex items-center gap-2 border border-secondary-100 rounded-md px-4 py-2 bg-white shadow-sm">
                <Image
                  src="/category.svg"
                  alt="category"
                  width={20}
                  height={20}
                  unoptimized
                  className="w-5 h-5"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-sm bg-transparent outline-none"
                >
                  <option value="All">All</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 border border-secondary-100 rounded-md px-4 py-2 bg-white shadow-sm">
                <Image
                  src="/sort.svg"
                  alt="sort"
                  width={20}
                  height={20}
                  unoptimized
                  className="w-5 h-5"
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm bg-transparent outline-none"
                >
                  {sortOptionsMap["task"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Task Lists */}
          {isLoading && <p className="text-secondary-400">Loading tasks...</p>}
          {isError && <p className="text-red-500">Failed to load tasks.</p>}

          {!isLoading && !isError && (
            <>
              {/* Time-Limit Section */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Time-Limit</h2>
                  <div className="flex gap-2">
                    <ChevronLeft
                      className="cursor-pointer"
                      onClick={() => scroll(timeLimitRef, "left")}
                    />
                    <ChevronRight
                      className="cursor-pointer"
                      onClick={() => scroll(timeLimitRef, "right")}
                    />
                  </div>
                </div>
                <div
                  ref={timeLimitRef}
                  className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                  {timeLimitTasks.length > 0 ? (
                    timeLimitTasks.map((task, idx) => (
                      <div
                        key={`time-task-${idx}`}
                        className="flex-shrink-0 w-[80%] sm:w-[70%] md:w-[45%] lg:w-[32%] xl:w-[25%]"
                      >
                        <TaskCard {...task} />
                      </div>
                    ))
                  ) : (
                    <p>No time-limit tasks found.</p>
                  )}
                </div>
              </div>

              {/* New Tasks Section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">New Tasks</h2>
                  <div className="flex gap-2">
                    <ChevronLeft
                      className="cursor-pointer"
                      onClick={() => scroll(newTasksRef, "left")}
                    />
                    <ChevronRight
                      className="cursor-pointer"
                      onClick={() => scroll(newTasksRef, "right")}
                    />
                  </div>
                </div>
                <div
                  ref={newTasksRef}
                  className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                  {newTasks.length > 0 ? (
                    newTasks.map((task, idx) => (
                      <div
                        key={`new-task-${idx}`}
                        className="flex-shrink-0 w-[80%] sm:w-[70%] md:w-[45%] lg:w-[32%] xl:w-[25%]"
                      >
                        <TaskCard {...task} />
                      </div>
                    ))
                  ) : (
                    <p>No new tasks found.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
