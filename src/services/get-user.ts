import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type User = {
  _id: string;
  name: string;
  email: string;
  task: number;
  ratings: number;
  designation: string;
  role: 'user' | 'admin' | string;
  mentor: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
        withCredentials: true, 
      });
      return response.data.data;
    },
  });
};
