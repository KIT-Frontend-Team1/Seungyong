import Layout from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import MainIndex from "../page/MainIndex";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainIndex />,
      },
    ],
  },
]);

export default router;
