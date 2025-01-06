import { baseApi } from "@/redux/api/baseAPi";

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
  }),
});
export const { useAddTasksMutation } = TasksApi;
