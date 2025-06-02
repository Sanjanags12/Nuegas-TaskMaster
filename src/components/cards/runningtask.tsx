"use client";

import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export type RunningTaskProps = {
  completed: number;
  totalTask: number;
 
};

const RunningTask: React.FC<RunningTaskProps> = ({
 completed,
 totalTask
}) => {
    const percentage = (completed/totalTask)*100;
  return (
    <div className="p-4 w-[200px] h-[200px] mx-10 bg-black rounded-md shadow-sm hover:shadow-md transition-all duration-300 ">
   
      <div className="flex items-start flex-col">
        <div className="flex items-center gap-3 ">

            <h2 className="text-base font-semibold text-white ">
             Running Task
            </h2>

        </div>

        <div className="flex items-center mx-2 ">

            <p className="text-3xl text-white">{completed}</p>

        </div>

 
      
      </div>
      <div className="flex justify-between p-5" >
      <div className="h-12 w-12 bg-black rounded-full overflow-hidden justify-center ">
            
          <CircularProgressbar value={percentage} text={`${percentage}%` }/>
        </div>
        
  
      <div className="flex justify-center items-start pt-3 mt-3 flex-col ">
        <div className="flex items-center  text-white text-3xl">
          
          {totalTask}
         <p className="flex text-sm text-secondary-400">Task</p>
        </div>
        
      </div>
      
</div>
    </div>
  );
};

export default RunningTask;
