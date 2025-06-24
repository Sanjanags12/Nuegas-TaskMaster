'use client';

import React from 'react';
import Navbar from '~/components/navbar/navbar';
import MentorCard from '~/components/cards/mentorcard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetMentors } from '~/services/get-mentor';

const Mentors = () => {
  const { data: mentors = [], isLoading, isError, error } = useGetMentors();

  const mappedMentors = mentors.map((mentor) => ({
     mentorId: mentor._id,
    mentorName: mentor.name,
    designation: mentor.designation,
    tasks: mentor.task,
    rating: mentor.ratings,
    profile: '', 
  }));

  const recentMentors = mappedMentors.slice(0, 3);

  return (
    <div className="h-screen bg-gray-50">
      <Navbar context={'task'} />
      <div className="p-4">
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <ChevronRight className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>

          <h2 className="text-lg font-semibold mb-4">Recent Mentors</h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {recentMentors.length > 0 ? (
              recentMentors.map((mentor, idx) => (
                <div key={`recent-${idx}`} className="min-w-[280px] max-w-sm">
                  <MentorCard  {...mentor} hideDescription />
                </div>
              ))
            ) : (
              <p>No recent mentors found.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Mentors</h2>

          {isLoading && <p>Loading mentors...</p>}
          {isError && (
            <p className="text-red-500">
              {(error as Error)?.message || 'Error loading mentors.'}
            </p>
          )}

          {!isLoading && !isError && mentors.length === 0 && (
            <p>No mentors found.</p>
          )}

          {!isLoading && !isError && mentors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mappedMentors.map((mentor, idx) => (
                <div key={`mentor-${idx}`} className="min-w-full">
                  <MentorCard  {...mentor} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
