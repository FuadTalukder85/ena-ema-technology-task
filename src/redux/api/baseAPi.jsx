import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2025",
    credentials: "include",
  }),
  tagTypes: ["tasks"],
  endpoints: () => ({}),
});
