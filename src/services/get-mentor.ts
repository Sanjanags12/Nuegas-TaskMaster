import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Endpoints } from '~/constants/endpoints.constants';

export type Mentor = {
  profile: string;
  mentorName: string;
  designation: string;
  description: string;
  tasks: string;
  rating: number;
  reviews?: number;
};

export const useGetMentors = () => {
  return useQuery<AxiosResponse<any, any>, Error, AxiosResponse<Mentor[]>>({
    queryKey: ['mentorData'],
    queryFn: () => axios.get(Endpoints.GET_MENTORS).then((res) => res),
  });
};
