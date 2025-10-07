import {createBrowserRouter, RouterProvider} from "react-router";
import index from "./components/pages/index/index";
import news from "./components/pages/news/news";
import dashboard from "./components/pages/dashboard/dashboard";
import auth from "./components/pages/auth/auth";
export default function MyRoutes(){
    
    return;
}

export let routes = createBrowserRouter([
  {
    path: "/",
    Component: index,
    
  },
  {
    path: "/auth",
    Component: auth,
    
  },
  {
    path: "/news",
    Component: news,
    
  },
  {
    path: "/dashboard",
    Component: dashboard,
    
  },

]);
