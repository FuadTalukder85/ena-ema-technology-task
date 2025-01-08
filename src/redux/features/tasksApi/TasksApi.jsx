import { baseApi } from "@/redux/api/baseApi";

const TasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTasks: builder.mutation({
      query: (addTasks) => ({
        url: "/api/tasks",
        method: "POST",
        body: addTasks,
      }),
      providesTags: ["tasks"],
    }),
    getTasks: builder.query({
      query: () => ({
        url: "/api/tasks",
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),
    updateTasks: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/tasks/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTasks: builder.mutation({
      query: (query) => ({
        url: `/api/tasks/${query}`,
        method: "DELETE",
        cache: "no-store",
      }),
    }),
  }),
});
export const {
  useAddTasksMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
  useDeleteTasksMutation,
} = TasksApi;
