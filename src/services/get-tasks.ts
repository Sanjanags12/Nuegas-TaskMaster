import axios, { AxiosResponse } from 'axios';
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
  return(
        useQuery<AxiosResponse<any,any>,Error,AxiosResponse<Task[]>>({
            queryKey: ['busDetailsData'],
            queryFn: ()=> axios.get(Endpoints.GET_TASKS).then(res=>res)
        })

    )
};
