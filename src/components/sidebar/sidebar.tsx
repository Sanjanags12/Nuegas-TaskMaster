"use client";

import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

// this is the side bar component with navigation's
const SideBar = () => {
  // show if side bar is open or hidden
  const [isOpen, setIsOpen] = useState(false);

  // router from next
  const router = useRouter();

  // this returns the navigation links for tabs
  const renderNavigationButtons = () => (
    <>
      {/* Navigate on click */}

      <Button
        className="bg-white items-start text-secondary-200 hover:text-black hover:bg-secondary-100 pb-3 "
        onClick={() => router.push("/overview")}
      >
        <Image
            src="/overview.svg" 
            alt="overview"
            width={18}
            height={18}
          />
        Overview
      </Button>
      <Button
        className="bg-white items-start text-secondary-200 hover:text-black hover:bg-secondary-100 pb-3 "
        onClick={() => router.push("/task")}
      >
        <Image
            src="/task.svg" 
            alt="task"
            width={18}
            height={18}
          />
        Task
      </Button>
      <Button
        className="bg-white items-start text-secondary-200 hover:text-black hover:bg-secondary-100 pb-3 "
        onClick={() => router.push("/mentors")}
      >
        <Image
            src="/mentor.svg" 
            alt="mentors"
            width={18}
            height={18}
          />
        Mentors
      </Button>
      <Button
        className="bg-white items-start text-secondary-200 hover:text-black hover:bg-secondary-100 pb-3 "
        onClick={() => router.push("/message")}
      >
        <Image
            src="/message.svg" 
            alt="message"
            width={18}
            height={18}
          />
        Message
      </Button>
      <Button
        className="bg-white items-start text-secondary-200 hover:text-black hover:bg-secondary-100 pb-3 "
        onClick={() => router.push("/settings")}
      >
        <Image
            src="/settings.svg" 
            alt="settings"
            width={18}
            height={18}
          />
        Settings
      </Button>
    </>
  );

  return (
    <>
      {/* hidden in mobile */}
      <div className="hidden sm:block items-center justify-center">
        <div className="flex flex-col gap-4 p-4 h-screen items-start pl-20 bg-white sm:max-w-[250px] sm:min-w-[200px] md:max-w-[500px] md:min-w-[300px]">
          <div className="flex items-start justify-center pb-10">
             <Image
            src="/bookHome.svg" 
            alt="home-menu"
            width={40}
            height={40}
            unoptimized
            className="w-7 h-7 p-1.5 rounded-lg bg-primary-500 mt-3 mx-2"
            onClick={() => setIsOpen((s) => !s)}
          />
            <p className=" text-black mt-2 font-bold text-2xl">
              Nuegas
            </p>
          </div>
          {renderNavigationButtons()}
        </div>
      </div>

      {/* Hamburger Icon — only visible on small screens */}
      <div className="sm:hidden relative w-10 ">
        {/* Hamburger Icon */}

        <div className="absolute z-50 left-2 w-12 h-10 items-start pt-3 ">
          <Image
            src="/menu.svg" // Use absolute path
            alt="Menu"
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 p-2 rounded-full hover:bg-secondary-100 active:bg-white cursor-pointer border-2 border-secondary-100/50"
            onClick={() => setIsOpen((s) => !s)}
          />
        </div>

        

        {/* Sidebar – only show if isOpen is true */}
        {isOpen && (
          <div className="absolute h-screen w-64 flex-col flex gap-6 border-2 bg-white rounded-sm p-1 items-start px-16  ">
          <div className="flex items-start justify-center mx-4">
             <Image
            src="/bookHome.svg" 
            alt="home-menu"
            width={40}
            height={40}
            unoptimized
            className="w-7 h-7 p-1.5 rounded-lg bg-primary-500 mt-3 mx-2"
            onClick={() => setIsOpen((s) => !s)}
          />
            <p className=" text-black mt-2 font-bold text-2xl">
              Nuegas
            </p>
          </div>
            {renderNavigationButtons()}
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
