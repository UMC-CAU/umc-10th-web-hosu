import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/HomePage";
import PublicLayout from "./layout/public-layout";
import LpDetailPage from "./pages/LpDetailPage";

const router = createBrowserRouter([
  // 공개 페이지 (사이드바 없음)
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
    ],
  },
  // 보호된 페이지 (사이드바 있음)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/lp/:lpId',
        element: <LpDetailPage />,
      },
      // { path: '/me', element: <MyPage /> },
      // { path: '/users/:userId', element: <UserPage /> },
      // { path: 'lps/user', element: <MyLpsPage /> },
      // { path: 'lps/:lpId/comments', element: <LpCommentPage /> },
      // { path: 'lps/likes/me', element: <MyLikeListPage /> },
      // { path: 'lps/likes/:userId', element: <UserLikeListPage /> },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
