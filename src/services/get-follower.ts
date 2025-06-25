import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Follower = {
  _id: string;
  name: string;
  following: {
    _id: string;
    name: string;
    email: string;
    task: number;
    ratings: number;
    designation: string;
    mentor: boolean;
    createdAt?: string;
    updatedAt?: string;
    profile?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

type FollowerApiResponse = {
  success:boolean;
  data : Follower[];
};

export const useGetFollowers = () => {
  return useQuery<Follower[], Error>({
    queryKey: ['userFollowers'], 
    queryFn: async () => {
      const response = await axios.get<FollowerApiResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/followers`, {
        withCredentials: true,
      });
      return response.data.data;
    },
  });
};
