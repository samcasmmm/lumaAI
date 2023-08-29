import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY =
  "luma-api-key=a374e113-58aa-494a-badc-b69049702c74-6cfc3c7-edbc-4aa0-9cb9-4482eceb2704";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Capture"],
  endpoints: (builder) => ({}),
});
