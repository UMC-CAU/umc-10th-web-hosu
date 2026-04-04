import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { MovieProvider } from "./contexts/MovieContext";
import PopularMovie from "./pages/PopularMovie";
import ComingSoonMovie from "./pages/ComingSoonMovie";
import HighRateMovie from "./pages/HighRateMovie";
import OnScreenMovie from "./pages/OnScreenMovie";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import { MovieDetailProvider } from "./contexts/MovieDetailContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
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
      {
        path: 'movie/:movieId',
        element: <MovieDetailProvider><MovieDetail /></MovieDetailProvider>
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
