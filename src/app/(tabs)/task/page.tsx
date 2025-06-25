'use client';

import React, { useState, useRef, useMemo } from "react";
import Navbar from "~/components/navbar/navbar";
import TaskCard, { TaskCardProps } from "~/components/cards/taskcard";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useGetAllTasks } from "~/services/get-alltask";

const sortOptionsMap = {
  task: ["All", "Deadline"],

};

const Task = () => {
  const { data: tasks = [], isLoading, error } = useGetAllTasks();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("All");

  const timeLimitRef = useRef<HTMLDivElement>(null!);
  const newTasksRef = useRef<HTMLDivElement>(null!);

  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (!ref.current) return;
    const cardWidth = ref.current.firstElementChild?.clientWidth || 0;
    const scrollAmount = cardWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const categories = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.category).filter(Boolean))),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (category !== "All") {
      filtered = filtered.filter((t) => t.category === category);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }

    if (sort === "Deadline") {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(a.createdAt || "").getTime() -
          new Date(b.createdAt || "").getTime()
      );
    }

    return filtered;
  }, [tasks, searchQuery, category, sort]);

  const timeLimitedTasks = useMemo(
    () => filteredTasks.filter((t) => "in-progress"),
    [filteredTasks]
  );

  const newTasks = useMemo(() => {
    return [...filteredTasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      )
      .slice(0, 5); 
  }, [filteredTasks]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
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

          {/* Loading & Error */}
          {isLoading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : error ? (
            <p className="text-center text-red-500">Failed to load tasks.</p>
          ) : (
            <>
              {/* Time-Limit Section */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Time-Limit</h2>
                  <div className="flex gap-2">
                    <ChevronLeft
                      className="cursor-pointer"
                      onClick={() => scroll("left", timeLimitRef)}
                    />
                    <ChevronRight
                      className="cursor-pointer"
                      onClick={() => scroll("right", timeLimitRef)}
                    />
                  </div>
                </div>
                <div
                  ref={timeLimitRef}
                  className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                  {timeLimitedTasks.length > 0 ? (
                    timeLimitedTasks.map((task, idx) => (
                      <div
                        key={`time-task-${idx}`}
                        className="flex-shrink-0 w-[calc(100%/3.5)]"
                      >
                        <TaskCard {...task} />
                      </div>
                    ))
                  ) : (
                    <p>No time-limited tasks found.</p>
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
                      onClick={() => scroll("left", newTasksRef)}
                    />
                    <ChevronRight
                      className="cursor-pointer"
                      onClick={() => scroll("right", newTasksRef)}
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
                        className="flex-shrink-0 w-[calc(100%/3.5)]"
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
