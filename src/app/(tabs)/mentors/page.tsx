
'use client';

import React from 'react';
import Navbar from '~/components/navbar/navbar';
import MentorCard from '~/components/cards/mentorcard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetMentors } from '~/services/get-mentor';

const Mentors = () => {
  const { data: response,  isLoading, isError } = useGetMentors();
   const mentors = response?.data || [];
  const recentMentors = mentors.slice(0, 3); 

  return (
    <div className="h-screen bg-gray-50">
      <Navbar context={'task'}  
      />
      <div className="p-4">
        <div className="relative">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <ChevronRight className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>

          <div className="relative">
            <h2 className="text-lg font-semibold mb-2">Recent Mentors</h2>
            <div className="flex items-center gap-4 pb-4">
              {recentMentors.map((mentor, idx) => (
                <div key={`recent-${idx}`} className="min-w-[280px] max-w-sm">
                  <MentorCard {...mentor} hideDescription />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h2 className="text-lg font-semibold mb-2">Mentors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4">
            {isLoading && <p>Loading mentors...</p>}
            {isError && <p className="text-red-500">{isError}</p>}
            {!isLoading && !isError && mentors.length > 0 ? (
              mentors.map((mentor, idx) => (
                <div key={`mentor-${idx}`} className="min-w-sm">
                  <MentorCard {...mentor} />
                </div>
              ))
            ) : (
              <p>No mentors found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
