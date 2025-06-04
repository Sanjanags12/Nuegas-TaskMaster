const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const Endpoints = {
   GET_TASKS: `${BASE_URL}/Tasks`,
  POST_NEW_TASK: `${BASE_URL}/newTasksubmission`,
};