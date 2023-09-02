import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  recordingData: {
    duration: null,
    path: null,
    size: null,
    codecs: null,
  },
  index: 1,
  apikey:
    "d3fe53b2-f02d-4bef-9dee-d2dacb1ea69d-6138d85-9e8b-4e37-a277-9af6d99e5afa",
  credits: null,
};

// "d3fe53b2-f02d-4bef-9dee-d2dacb1ea69d-6138d85-9e8b-4e37-a277-9af6d99e5afa",
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
    clearRecordingDetails: (state, actions) => {
      state.recordingData.duration = null;
      state.recordingData.path = null;
      state.recordingData.size = null;
      state.recordingData.codecs = null;
    },
  },
});

export const selectSaveRecordingData = (state) => state.camera.recordingData;
export const selectTabIndex = (state) => state.camera.index;
export const selectAPIKEY = (state) => state.camera.apikey;
export const selectGetCredits = (state) => state.camera.credits;

export const {
  saveRecordingDetails,
  setTabIndex,
  setApiKey,
  setCredits,
  clearRecordingDetails,
} = cameraSlice.actions;
export default cameraSlice.reducer;
