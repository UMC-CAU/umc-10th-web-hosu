import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          // { path: '/me', element: <MyPage /> },
          // { path: '/users/:userId', element: <UserPage /> },
          // { path: 'lps/user', element: <MyLpsPage /> },
          // { path: 'lps/:lpId/comments', element: <LpCommentPage /> },
          // { path: 'lps/likes/me', element: <MyLikeListPage /> },
          // { path: 'lps/likes/:userId', element: <UserLikeListPage /> },
        ]
      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
