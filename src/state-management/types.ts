export type Task = {
  _id: string;
  userId: string;
  taskId: string;
  progress: number;
  rating: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};
