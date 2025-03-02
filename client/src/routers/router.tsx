import App from "@/App";
import ProfileAbout from "@/components/profile/profile-about";
import ProfilePhotos from "@/components/profile/profile-photos";
import ProfileTimeline from "@/components/profile/profile-timeline/profile-timeline";
import LoginPage from "@/pages/login/page";
import PostPage from "@/pages/post/page";
import RegisterPage from "@/pages/register/page";
import ProfileLayout from "@/pages/profile/page";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "posts",
        element: <PostPage />,
      },
      {
        path: "profile/:username",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <ProfileTimeline /> },
          { path: "about", element: <ProfileAbout /> },
          { path: "photos", element: <ProfilePhotos /> },
        ],
      },
    ],
  },
]);

const Root = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Root;
