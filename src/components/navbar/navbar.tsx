"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import Image from "next/image";

export default function Navbar() {
  const [state, setState] = React.useState(false)


  return (
    <nav className="bg-white w-full border-b md:border-0">
    <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8 flex-row">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div>
            <p>Explore Task</p>
          </div>
          
        </div>
        <div className= "flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 flex-row">
          <div className="z-50 left-2 w-12 h-10 items-start pt-3 ">
           <Image
                      src="/notification.svg" 
                      alt="home-menu"
                      width={40}
                      height={40}
                      unoptimized
                      className="w-7 h-7 p-1.5 rounded-lg bg-white mt-3 mx-2"
                   //   onClick={() => setIsOpen((s) => !s)}
                    />

          </div>
           <div className="  items-start pt-3 ">
           <Image
                      src="/images/profilepic.png" 
                      alt="home-menu"
                      width={50}
                      height={50}
                      unoptimized
                      className="w-10 h-10  rounded-full bg-white "
                   //   onClick={() => setIsOpen((s) => !s)}
                    />

          </div>
        </div>

       <div className="flex">
        <div className="flex items-center  space-x-2 border rounded-md p-2">
              <Search className="h-5 w-5 flex-none text-gray-300" />
              <input
                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                type="text"
                placeholder="Search"
              />
            </div>

            <div>
                <div>
                    <Image
                      src="category.svg" 
                      alt="home-menu"
                      width={30}
                      height={30}
                      unoptimized
                      className="w-7 h-7 rounded bg-white "
                   //   onClick={() => setIsOpen((s) => !s)}
                    />
          <p>category</p>
                </div> 
               <div>
                <Image
                      src="sort.svg" 
                      alt="home-menu"
                      width={30}
                      height={30}
                      unoptimized
                      className="w-7 h-7 rounded bg-white "
                   //   onClick={() => setIsOpen((s) => !s)}
                    />
                <p>
                    
                    filter
                </p>

               </div>
            </div>

            </div>
      </div>
    </nav>
  )
}