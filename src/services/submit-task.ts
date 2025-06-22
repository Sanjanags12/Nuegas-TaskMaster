import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '~/state-management/types';
import { Endpoints } from '~/constants/endpoints.constants';


export const useSubmitNewTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task>({
    mutationFn: (newTask) =>
      axios.post(Endpoints.POST_NEW_TASK, newTask).then(res => res.data),
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['newTasksubmission'] });
    },
  });
};
