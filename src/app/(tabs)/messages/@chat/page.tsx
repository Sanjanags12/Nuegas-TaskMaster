'use client';
import { useSearchParams } from 'next/navigation';
import { useGetFollowers } from '~/services/get-follower';
import Chat from './chat';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get('receiverId');
  const { data: followers = [] } = useGetFollowers();

  const follower = followers.find(
    (f) => f.following._id === receiverId
  );

  if (!receiverId || !follower) {
    return (
      <div className="p-4 text-center text-gray-400 justify-center">
        Select a follower to start chatting.
      </div>
    );
  }

  return <Chat receiverId={receiverId} follower={follower.following} />;
}
