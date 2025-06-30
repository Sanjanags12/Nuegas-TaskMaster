"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "../button/button";

type NavbarProps = {
  title?: string;
  context: "task" | "mentor"| "Message";
  
};

const Navbar: React.FC<NavbarProps> = ({
  title = "Explore",
  context,
 
}) => {
  return (
    <nav className="bg-white w-full ">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center border-b">
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
    </nav>
  );
};

export default Navbar;
