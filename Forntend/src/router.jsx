import { createBrowserRouter } from "react-router-dom";

import Register from "./pages/register";
import Login from "./pages/login";
import CreateJob from "./pages/CreateJob";
import Home from "./pages/home";
import Jobdetail from "./pages/jobdetail";
import Applyjob from "./pages/applyjob";
import SavedJobs from "./pages/savedjob";
import Appliedjobs from "./pages/appliedjobs";
import Applications from "./pages/Applications";
import UpdateJob from "./pages/updateJob";
import Userprofile from "./pages/userprofile";

let Routerpath = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/CreateJob", element: <CreateJob /> },
  { path: "/:id", element: <Jobdetail /> },
  { path: "/:id/apply", element: <Applyjob /> },
  { path: "/saved", element: <SavedJobs /> },
  { path: "/applied", element: <Appliedjobs /> },
  { path: "/update/:id", element: <UpdateJob /> },
  { path: "/employee/applications", element: <Applications /> },
  { path: "/profile", element: <Userprofile /> },
]);

export default Routerpath;
