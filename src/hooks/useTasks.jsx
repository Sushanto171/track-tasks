import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosInstance from "./useAxiosInstance";

const useTasks = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();

  const {
    data: tasks = [],
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [user?.email, "tasks"],
    queryFn: async () => {
      const { data } = await axiosInstance(`/tasks/${user?.email}`);
      return data?.data || [];
    },
  });

  return { tasks, refetch, isLoading, isError };
};

export default useTasks;
