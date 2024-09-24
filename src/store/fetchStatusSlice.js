import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetchDone: false,
    currentlyfetching: false,
  },
  reducers: {
    markfetchDone: (state) => {
      state.fetchDone = true; // Correct usage of Immer's draft
    },
    markfetingStarted: (state) => {
      state.currentlyfetching = true; // Correct usage of Immer's draft
    },
    markfetchingDone: (state) => {
      state.currentlyfetching = false; // Correct usage of Immer's draft
    },
  },
});

export const { markfetchDone, markfetingStarted, markfetchingDone } =
  fetchStatusSlice.actions;

export default fetchStatusSlice;
