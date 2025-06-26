'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetFollowers } from '~/services/get-follower';
import Image from 'next/image';

export default function FollowersPage() {
  const { data: followers = [], isLoading, error } = useGetFollowers();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedFollower = searchParams.get('receiverId');

  const filtered = followers.filter(f =>
    f.following.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 bg-white ">
    
      <input
        type="text"
        placeholder="Search followers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none"
      />
      <div className="bg-white overflow-hidden m-3  ">
        
        {isLoading && <p className="p-4">Loading followers...</p>}
        {error && <p className="p-4 text-red-500">Error loading followers</p>}
        {!isLoading &&
          filtered.map(f => (
            <div
              key={f._id}
              className={`flex items-center cursor-pointer   rounded-lg p-3 ${
                selectedFollower === f.following._id ? 'bg-gray-50' : ''
              }`}
              onClick={() => {
                router.push(`/messages?receiverId=${f.following._id}`);
              }}
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
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-lg uppercase">
                  {f.following.name.charAt(0)}
                </div>
              )}
              <span className="ml-3 font-medium">{f.following.name}</span>
            </div>
          ))}
      </div>
      
    </div>
  );
}
