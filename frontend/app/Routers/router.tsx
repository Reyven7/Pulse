import { createBrowserRouter } from "react-router-dom";
import App from "src/App";

export const router = createBrowserRouter(
    [{
        path: "/",
        element: <App />,
        children: [
        //   {path: "home", element: <Home/>}
        ],  
    }]
)