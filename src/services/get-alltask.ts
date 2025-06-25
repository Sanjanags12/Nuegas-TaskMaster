import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type AllTask = {
  _id: string;
  title: string;
  description: string;
  category: string;
  timeToComplete: number;
  displayMedia: string;
  displayMediaType: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    task: number;
    ratings: number;
    designation: string;
    mentor: boolean;
  };
};


export const useGetAllTasks = () => {
  return useQuery<AllTask[], Error>({
    queryKey: ['alltask'],
    queryFn: async () => {
      const response = await axios.get<{ success: boolean; data: AllTask[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`,
        { withCredentials: true }
      );
      return response.data.data;
    },
  });
};
