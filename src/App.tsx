import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SearchPlayer from "./pages/SearchPlayer";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "searchPlayer",
        element: <SearchPlayer />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
