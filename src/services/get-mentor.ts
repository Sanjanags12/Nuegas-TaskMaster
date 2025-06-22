import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Mentor = {
  _id: string;
  name: string;
  email: string;
  task: number;
  ratings: number;
  designation: string;
  mentor: boolean;
};

type MentorApiResponse = {
  success: boolean;
  data: Mentor[];
};

export const useGetMentors = () => {
  return useQuery<Mentor[], Error>({
    queryKey: ['mentorData'],
    queryFn: async () => {
      const res = await axios.get<MentorApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mentors`,
        { withCredentials: true }
      );
      return res.data.data;
    },
  });
};
