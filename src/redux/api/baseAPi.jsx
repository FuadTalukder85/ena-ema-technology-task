import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ena-ema-technology-task-server.vercel.app/",
    credentials: "include",
  }),
  tagTypes: ["tasks"],
  endpoints: () => ({}),
});
