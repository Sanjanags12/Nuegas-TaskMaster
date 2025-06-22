import axios from 'axios';
import { useMutation } from '@tanstack/react-query';


export const useFollowUser = () => {
  return useMutation({
    mutationFn: async (followingId: string) => {
      if (!followingId || !/^[0-9a-fA-F]{24}$/.test(followingId)) {
        throw new Error('Invalid mentor ID.');
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/followers`,
        { following: followingId },
        { withCredentials: true }
      );

      return response.data;
    },
  });
};
