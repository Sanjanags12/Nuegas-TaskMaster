"use client";
import React from "react";
import Navbar from "~/components/navbar/navbar";
import { useGetFollowers } from "~/services/get-follower";
import { useGetMessage } from "~/services/get-message";
import Image from 'next/image';
import { useRouter } from "next/navigation";
const Message = () => {
   const { data: useFollowUser =[], isLoading:followerLoading , error:followerError } = useGetFollowers();
   const { data: Messages , isLoading:messageLoading , error:messageError } = useGetMessage();
  
     const router = useRouter();
   

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden w-full px-4 sm:px-8 pb-5">
     <Navbar title="Message" context={"Message"}/>
      <div className="flex flex-row justify-between pt-5">
        
     


    
<div className="mt-8 border bg-white w-full rounded-sm">
  
  <div className="w-full overflow-hidden">
    <div className="flex mr-10 transition-transform duration-300 m-5 ">
      <ul>
        
          {followerLoading && <p>Loading mentors...</p>}
          {followerError && (
            <p className="text-red-500">
              { 'Error loading folloers.'}
            </p>
          )}
        {useFollowUser.map((follower) => (
          <li key={follower._id} className="flex flex-col border  pt-5 text-secondary-500 m-4" >
            <div className="flex flex-col ">
           
         
            <div className="flex  gap-3 rounded-full flex-row">
                      {follower.following.profile ? (
                        <Image
                          src={follower.following.profile}
                          alt={`${follower.following.name} profile`}
                          width={50}
                          height={50}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-lg uppercase">
                          {follower.following.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      
            </div>
             <div className="flex w-full h-10 rounded-md m-4 ">
              <p className="text-black font-bold text-md justify-start ml-1">{follower.following.name}</p> 
            </div>
            </div>
            
           
            
            
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

</div>
</div>
    
  
  );
};

export default Message ;
