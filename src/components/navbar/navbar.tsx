"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../button/button";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const onNotificationClick = {};

  return (
    <nav className="bg-white w-full border-b">
      <div className="bg-white  ">
        <div className="mx-auto max-w-6xl py-3 px-4 flex flex-col lg:flex-row items-center justify-between">
          <p className="text-xs font-base  text-gray-900 sm:text-4xl">
            {/* {title} */} Explore Task
          </p>
          <div className="mt-3 lg:mt-0 flex space-x-3">
            <Button
              //onClick={onNotificationClick}
              className="rounded-full bg-white "
            >
              <Image
                src="/notification.svg"
                alt="notification"
                width={30}
                height={30}
                unoptimized
                className="w-6 h-6"
              />
            </Button>
            <Button 
           // onClick={onProfileClick} 
            className="rounded-full bg-white">
              <Image
                src="/images/profilepic.png"
                alt="profile"
                width={30}
                height={30}
                unoptimized
                className="w-8 h-8 rounded-full"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2 flex items-center border rounded-md p-2 bg-white">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Task"
            className="w-full outline-none placeholder-gray-500 text-gray-700"
          />
        </div>

        <div className="flex space-x-10 items-center">
          <div className="hidden md:flex flex-row gap-2.5 items-center shadow p-2 rounded-sm ">
            <Image
              src="/category.svg"
              alt="category"
              width={30}
              height={30}
              unoptimized
              className="w-5 h-5 bg-white rounded"
            />
            <p className="text-base ">Category</p>
          </div>

          <div className="flex first-line:flex-row gap-2.5 items-center shadow p-2 rounded-sm ">
            <Image
              src="/sort.svg"
              alt="sort"
              width={30}
              height={30}
              unoptimized
              className="w-7 h-7 bg-white rounded"
            />
            <p className="text-sm">Sort</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
