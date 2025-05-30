"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../button/button";
import Image from "next/image";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const renderNavigationButtons = () => (
    <>
      {[
        { label: "Overview", path: "/overview", icon: "/overview.svg" },
        { label: "Task", path: "/task", icon: "/task.svg" },
        { label: "Mentors", path: "/mentors", icon: "/mentor.svg" },
        { label: "Message", path: "/message", icon: "/message.svg" },
        { label: "Settings", path: "/settings", icon: "/settings.svg" },
      ].map(({ label, path, icon }) => (
        <Button
          key={label}
          className="flex items-center gap-2 bg-white text-secondary-200 hover:text-black hover:bg-secondary-100 w-full py-2 px-2 rounded-md"
          onClick={() => {
            setIsOpen(false); // auto-close sidebar on mobile after navigation
            router.push(path);
          }}
        >
          <Image src={icon} alt={label} width={18} height={18} unoptimized />
          <span className="text-sm">{label}</span>
        </Button>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col gap-6 p-6 h-screen bg-white min-w-[200px] max-w-[250px] border-r overflow-y-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/bookHome.svg"
            alt="Home"
            width={40}
            height={40}
            unoptimized
            className="w-8 h-8 p-1.5 rounded-lg bg-primary-500"
          />
          <p className="text-xl font-bold text-black">Nuegas</p>
        </div>
        {renderNavigationButtons()}
      </aside>

      {/* Mobile: Hamburger Menu */}
      <div className="sm:hidden relative">
        {/* Hamburger Button */}
        <div className="fixed top-4 left-4 z-50">
          <Image
            src="/menu.svg"
            alt="Menu"
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 p-2 rounded-full border border-secondary-100 bg-white hover:bg-secondary-100 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-lg flex flex-col gap-6 px-6 py-4 overflow-y-auto transition-all">
            <div className="flex items-center gap-2">
              <Image
                src="/bookHome.svg"
                alt="Home"
                width={40}
                height={40}
                unoptimized
                className="w-8 h-8 p-1.5 rounded-lg bg-primary-500"
              />
              <p className="text-xl font-bold text-black">Nuegas</p>
            </div>
            {renderNavigationButtons()}
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
