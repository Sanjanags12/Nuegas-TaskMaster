"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { socket } from "~/lib/socket";
import { useGetUser } from "~/services/get-user";



type ChatProps = {
  receiverId: string;
};

const Chat: React.FC<ChatProps> = ({ receiverId }) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);
    const { data: user } = useGetUser();
    
    

  // Fetch messages between user and receiver
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", receiverId],
    enabled: !!receiverId,
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/${receiverId}`,
        { withCredentials: true }
      );
      return res.data.data;
    },
  });

  // Send message
  const sendMessage = useMutation({
    mutationFn: async (newMessage: string) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`,
        { content: newMessage, receiver: receiverId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages", receiverId] });
    },
  });

  // Socket setup
  useEffect(() => {
    if (!user?._id) return;

    socket.io.opts.query = { userId: user?._id };
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("receive_message", (data) => {
      if (
        (data.sender === user._id && data.receiver === receiverId) ||
        (data.sender === receiverId && data.receiver === user._id)
      ) {
        queryClient.setQueryData<any[]>(["messages", receiverId], (old = []) => [
          ...old,
          data,
        ]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [receiverId, queryClient]);

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage.mutate(message);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border shadow rounded ">
      {/* Chat messages page */}
      <div className="flex-1 overflow-y-auto p-4 bg-green-200 no-scrollbar">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-secondary-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg: any, idx: number) => {
            const isSender = msg.sender === user?._id;
            return (
              <div
                key={idx}
                className={`mb-3 p-2 px-4 rounded shadow text-sm max-w-fit ${
                  isSender
                    ? "bg-primary-200 ml-auto text-right"
                    : "bg-white mr-auto text-left"
                }`}
                
              >
                {msg.content}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* sending message */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-3 border-t bg-white"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg mr-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
