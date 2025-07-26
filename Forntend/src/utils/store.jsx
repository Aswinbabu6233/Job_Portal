import { configureStore } from "@reduxjs/toolkit";
import savedJobsReducer from "./savedjobslice";
import authReducer from "./authslice";

const store = configureStore({
  reducer: {
    savedJobs: savedJobsReducer,
    user: authReducer,
  },
});

export default store;
