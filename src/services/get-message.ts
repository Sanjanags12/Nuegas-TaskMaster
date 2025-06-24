import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Message = {
  _id: string;
  sender: string;
  receiver: string;
  type: string;
  content:string;
  read: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const useGetMessage = () => {
  return useQuery<Message, Error>({
    queryKey: ['message'],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`, {
        withCredentials: true, 
      });
      return response.data.data;
    },
  });
};
