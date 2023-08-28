import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordingData: {
    duration: null,
    path: null,
    size: null,
    codecs: null,
  },
  index: 1,
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
  },
});

export const selectSaveRecordingData = (state) => state.camera.recordingData;
export const selectTabIndex = (state) => state.camera.index;

export const { saveRecordingDetails, setTabIndex } = cameraSlice.actions;
export default cameraSlice.reducer;
