import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { MovieProvider } from "./contexts/MovieContext";
import PopularMovie from "./pages/PopularMovie";
import ComingSoonMovie from "./pages/ComingSoonMovie";
import HighRateMovie from "./pages/HighRateMovie";
import OnScreenMovie from "./pages/OnScreenMovie";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PopularMovie />,
      },
      {
        path: 'popular',
        element: <PopularMovie />,
      },
      {
        path: 'coming-soon',
        element: <ComingSoonMovie />,
      },
      {
        path: 'high-rate',
        element: <HighRateMovie />,
      },
      {
        path: 'on-screen',
        element: <OnScreenMovie />,
      },
    ],
  },
]);

function App() {
  return (
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  );
}

export default App;
