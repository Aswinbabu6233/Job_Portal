import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [], // array of saved job IDs
};

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState,
  reducers: {
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      if (state.jobs.includes(jobId)) {
        state.jobs = state.jobs.filter((id) => id !== jobId);
      } else {
        state.jobs.push(jobId);
      }
    },
    setSavedJobs: (state, action) => {
      state.jobs = action.payload; // load saved jobs on login or mount
    },
  },
});

export const { toggleSaveJob, setSavedJobs } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
