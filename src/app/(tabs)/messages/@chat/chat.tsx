'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { socket } from '~/lib/socket';
import { useGetUser } from '~/services/get-user';

type ChatProps = {
  receiverId: string;
  follower: {
    _id: string;
    name: string;
    profile?: string;
  };
};
const Chat: React.FC<ChatProps> = ({ receiverId,follower }) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { data: user } = useGetUser();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', receiverId],
    enabled: !!receiverId,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/${receiverId}`,
        { withCredentials: true }
      );
      return res.data.data;
    },
  });




  const sendMessage = useMutation({
    mutationFn: async (newMessage: string) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`,
        { content: newMessage, receiver: receiverId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['messages', receiverId] });
    },
  });

  useEffect(() => {
    if (!user?._id) return;

    socket.io.opts.query = { userId: user._id };
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('receive_message', (data) => {
      if (
        (data.sender === user._id && data.receiver === receiverId) ||
        (data.sender === receiverId && data.receiver === user._id)
      ) {
        queryClient.setQueryData<any[]>(['messages', receiverId], (old = []) => [
          ...old,
          data,
        ]);
      }
    });

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [receiverId, queryClient]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage.mutate(message);
    }
  };

  return (
    <div className="flex flex-col h-[530px] ">
      <div className="flex items-center space-x-4 p-3 bg-white pl-5 ">
  {follower.profile ? (
    <img
      src={follower.profile}
      alt={follower.name}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-lg uppercase">
      {follower.name?.[0]}
    </div>
  )}
  <span className="font-medium text-lg">{follower.name}</span>
</div>
      <div className="flex-1 overflow-y-auto bg-grey-100 p-4 no-scrollbar">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg: any, idx: number) => {
            const isSender = msg.sender === user?._id;
            return (
              <div
                key={idx}
                className={`mb-3 p-2 px-4  shadow text-sm w-[350px]  ${
                  isSender
                    ? 'bg-primary-500 ml-auto text-right text-white rounded-tl-md rounded-b-md max-w-fit'
                    : 'bg-white mr-auto text-left rounded-tr-md rounded-b-md max-w-fit '
                }`}
              >
                {msg.content}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex p-3  bg-white">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg mr-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
