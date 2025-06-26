'use client';
import React, { useState, useEffect } from "react";
import Navbar from "~/components/navbar/navbar";
import { useGetFollowers } from "~/services/get-follower";
import { useGetMessage } from "~/services/get-message";
import Image from 'next/image';
import Chat from "./chat/page"; 

export default function Message() {
  const { data: followers = [], isLoading: fLoading, error: fError } = useGetFollowers();
  const [search, setSearch] = useState("");
  const [selectedFollower, setSelectedFollower] = useState<string | null>(null);

  const filtered = followers.filter(f =>
    f.following.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full px-4 sm:px-8 pb-5 ">
      <Navbar title="Messages" context="Message" />
      
      <div className="mt-4 max-w-md mx-auto space-y-4 flex flex-col">
       
        <input
          type="text"
          placeholder="Search followers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />

        <div className="bg-white rounded shadow divide-y overflow-hidden ">
          {fLoading && <p className="p-4">Loading followers...</p>}
          {fError && <p className="p-4 text-red-500">Error loading followers</p>}
          {!fLoading && filtered.map(f => (
            <div
              key={f._id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                selectedFollower === f.following._id ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSelectedFollower(f.following._id)}
            >
              {f.following.profile ? (
                <Image
                  src={f.following.profile}
                  width={40}
                  height={40}
                  alt={f.following.name}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-lg uppercase">
                  {f.following.name.charAt(0)}
                </div>
              )}
              <span className="ml-3 font-medium">{f.following.name}</span>
            </div>
          ))}
        </div>

        
       
      </div>
       {selectedFollower && (
          <Chat receiverId={selectedFollower} />
        )}
    </div>
  );
}
