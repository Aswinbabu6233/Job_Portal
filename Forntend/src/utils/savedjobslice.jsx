import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
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
  },
});

export const { toggleSaveJob } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
