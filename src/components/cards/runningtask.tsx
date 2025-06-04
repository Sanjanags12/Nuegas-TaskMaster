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
  const percentage = Math.round((completed / totalTask) * 100);

  return (
    <div className="p-4 w-[200px] h-[200px] bg-black rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mx-10">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">Running Task</h2>
          <p className="text-4xl text-white ml-5">{completed}</p>
        </div>

        <div className="flex items-center justify-between mx-5">
          <div className="h-14 w-14">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={{
                path: { stroke: '#4f46e5' }, 
                text: { fill: 'white', fontSize: '24px' },
                trail: { stroke: '#1f2937' }
              }}
            />
          </div>

          <div className="flex flex-col items-end">
            <span className="text-4xl text-white">{totalTask}</span>
            <span className="text-md text-gray-400">Task</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningTask;
