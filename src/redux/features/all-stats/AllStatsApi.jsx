import { baseApi } from "@/redux/api/baseApi";

const AllStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/api/aggregated-tasks",
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),
  }),
});
export const { useGetStatsQuery } = AllStatsApi;
