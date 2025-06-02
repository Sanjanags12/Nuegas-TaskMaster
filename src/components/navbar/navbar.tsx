"use client";

import * as React from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../button/button";

type NavbarProps = {
  title?: string;
  searchPlaceholder?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  title = "Explore Task",
  searchPlaceholder = "Search Task",
}) => {
  return (
    <nav className="bg-white w-full border-b">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <p className="text-xl sm:text-2xl font-medium text-gray-900">{title}</p>

        <div className="flex items-center gap-3 w-auto ">
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
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

    
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:max-w-md bg-white border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full outline-none placeholder-gray-500 text-gray-700 text-sm"
          />
          <Search className="h-5 w-5 text-gray-400 ml-2" />
        </div>

        <div className="flex gap-4 sm:gap-6 items-center">
          
          <div className="hidden sm:flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm"
          >
            <Image
              src="/category.svg"
              alt="category"
              width={20}
              height={20}
              unoptimized
              className="w-5 h-5"
            />
            <p className="text-sm">Category</p>
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm">
            <Image
              src="/sort.svg"
              alt="sort"
              width={20}
              height={20}
              unoptimized
              className="w-5 h-5"
            />
            <p className="text-sm">Sort By: Deadline</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
