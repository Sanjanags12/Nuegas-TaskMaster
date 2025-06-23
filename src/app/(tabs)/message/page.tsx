import React from "react";
import { useGetFollower } from "~/services/get-follower";

const Message = () => {
   const { data: useFollowUser } = useGetFollower();
  
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="text-2xl text-center">Message Page</p>
      <br />
      <p className="text-xl">In Progress......</p>
    </div>
  );
};

export default Message ;
