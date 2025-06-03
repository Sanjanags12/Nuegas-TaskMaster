import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Endpoints } from '~/constants/endpoints.constants';

export type Task = {
  taskName: string;
  category: string;
  image: string;
  percentage: number;
  time: string;
  description?: string;
  teamImages?: string[];
};


export const useGetTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get(`${Endpoints.GET_TASKS}`);
      return response.data;
    }
  });
};
