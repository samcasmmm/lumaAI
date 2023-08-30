import { apiSlice } from "../../apiSlice";
const CAPTURE_API = "https://webapp.engineeringlumalabs.com/api/v2/capture";

export const captureApiSlices = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCredits: builder.query({
      query: (APIKEY) => ({
        url: `${CAPTURE_API}/credits`,
        headers: {
          Authorization: `luma-api-key=${APIKEY}`,
        },
      }),
    }),

    createCapture: builder.mutation({
      query: (data) => ({
        url: CAPTURE_API,
        method: "POST",
        headers: {
          Authorization: `luma-api-key=${data?.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data?.title }),
      }),
    }),

    uploadCapture: builder.mutation({
      query: (data) => ({
        url: data?.url,
        method: "PUT",
        headers: {
          "Content-Type": "video/mp4",
        },
        body: { uri: data.videoPath },
      }),
    }),

    triggerCapture: builder.mutation({
      query: (data) => ({
        url: `${CAPTURE_API}/${data.slug}`,
        method: "POST",
        headers: {
          Authorization: `luma-api-key=${data?.key}`,
          "Content-Type": "text/plain",
        },
      }),
    }),
    getACapture: builder.query({}),
    getAllCapture: builder.query({}),
  }),
});

export const {
  useGetCreditsQuery,
  useCreateCaptureMutation,
  useUploadCaptureMutation,
  useTriggerCaptureMutation,
  useGetACaptureQuery,
  useGetAllCaptureQuery,
} = captureApiSlices;
