import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordingData: {
    duration: null,
    path: null,
    size: null,
    codecs: null,
  },
  index: 1,
  apikey:
    "a374e113-58aa-494a-badc-b69049702c74-6cfc3c7-edbc-4aa0-9cb9-4482eceb2704",
  credits: null,
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    saveRecordingDetails: (state, actions) => {
      state.recordingData.duration = actions.payload.duration;
      state.recordingData.path = actions.payload.path;
      state.recordingData.size = actions.payload.size;
      state.recordingData.codecs = actions.payload.codecs;
    },
    setTabIndex: (state, action) => {
      state.index = action.payload.index;
    },

    setApiKey: (state, action) => {
      state.apikey = action.payload.apikey;
    },
    setCredits: (state, action) => {
      state.credits = action.payload.credits;
    },
  },
});

export const selectSaveRecordingData = (state) => state.camera.recordingData;
export const selectTabIndex = (state) => state.camera.index;
export const selectAPIKEY = (state) => state.camera.apikey;
export const selectGetCredits = (state) => state.camera.credits;

export const { saveRecordingDetails, setTabIndex, setApiKey, setCredits } =
  cameraSlice.actions;
export default cameraSlice.reducer;
