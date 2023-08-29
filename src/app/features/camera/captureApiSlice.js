import { apiSlice } from "../../apiSlice";
const CAPTURE_API = "https://webapp.engineeringlumalabs.com/api/v2/capture";

export const captureApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCredits: builder.query({
      query: (APIKEY) => ({
        url: `${CAPTURE_API}/credits`,
        headers: {
          Authorization: `luma-api-key=${APIKEY}`,
        },
      }),
    }),
    createCapture: (builder) => ({}),
    uploadCapture: (builder) => ({}),
    triggerCapture: (builder) => ({}),
    getACapture: (builder) => ({}),
    getAllCapture: (builder) => ({}),
  }),
});

export const { useGetCreditsQuery } = captureApiSlices;
