import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Task = {
  category: any;
  _id: string;
  userId: string;
  taskId: string;
  progress: number;
  rating: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export const useGetTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ['taskData'],
    queryFn: async () => {
      const response = await axios.get<{ success: boolean; data: Task[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-tasks`,
        { withCredentials: true }
      );
      return response.data.data;
    },
  });
};
