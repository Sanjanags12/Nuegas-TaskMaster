import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Users = {
  name: string;
  email: string;
  password: string;
  designation: string;
  task: number;
  ratings: number;
};

export const useGetUser = () => {
  return useQuery<Users[], Error>({
    queryKey: ['userData'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
        withCredentials: true,
      });
      
      return res.data.data as Users[];
    },
  });
};
