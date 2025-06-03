"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../button/button";

type NavbarProps = {
  title?: string;
  searchPlaceholder?: string;
  context: "task" | "mentor";
  categories: string[];
  onFilterChange: (filters: {
    category: string;
    sort: string;
    searchQuery: string;
  }) => void;
};

const sortOptionsMap = {
  task: ["All", "Deadline"],
  mentor: ["All", "Popularity"],
};

const Navbar: React.FC<NavbarProps> = ({
  title = "Explore",
  searchPlaceholder = "Search...",
  context,
  categories,
  onFilterChange,
}) => {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    onFilterChange({ category, sort, searchQuery });
  }, [category, sort, searchQuery]);

  return (
    <nav className="bg-white w-full border-b">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <p className="text-xl sm:text-2xl font-medium text-gray-900">{title}</p>

        <div className="flex items-center gap-3">
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
          <div className="bg-white hover:shadow-lg rounded-full border">
            <Image
              src="/images/profilepic.png"
              alt="profile"
              width={30}
              height={30}
              unoptimized
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:max-w-md bg-white border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none placeholder-secondary-200 text-secondary-400 text-sm"
          />
          <Search className="h-5 w-5 text-gray-400 ml-2" />
        </div>

        {/* Category + Sort */}
        <div className="flex gap-4 sm:gap-6 items-center">
          {/* Category Dropdown */}
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

          {/* Sort Dropdown */}
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
              {sortOptionsMap[context].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
