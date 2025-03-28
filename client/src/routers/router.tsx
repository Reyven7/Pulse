import App from "@/App";
import ProfileAbout from "@/components/profile/profile-about";
import ProfilePhotos from "@/components/profile/profile-photos";
import ProfileTimeline from "@/components/profile/profile-timeline/profile-timeline";
import PostPage from "@/pages/post-page";
import ProfileLayout from "@/pages/profile-page";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "@/pages/authentication-page";
import PostDetail from "@/components/posts/post-detail";

const router = createBrowserRouter([
  {
    path: "/authentication/:type",
    element: <AuthenticationPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "posts",
        element: <PostPage />,
      },
      {
        path: "posts/:postId",
        element: <PostDetail />,
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
