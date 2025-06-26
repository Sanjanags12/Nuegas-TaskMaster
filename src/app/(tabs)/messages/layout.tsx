
import React from 'react';
import Navbar from '~/components/navbar/navbar';

export default function MessagesLayout({
  followers,
  chat,
}: {
  followers: React.ReactNode;
  chat: React.ReactNode;
}) {
  return (
    <div className='min-h-screen'>
        <Navbar title="Messages" context="Message" />
      <div className=" flex ">
      
      <div className="w-1/3 border-r bg-gray-50">{followers}</div>
      <div className="w-2/3">{chat}</div>
    </div>

    </div>
    
  );
}
