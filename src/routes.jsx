import {createBrowserRouter, RouterProvider} from "react-router";
import index from "./components/pages/index/index";
import news from "./components/pages/news/news";
import LK from "./components/pages/LK/LK";
import auth from "./components/pages/auth/auth";
import newsChildren from "./components/pages/newsChildren/newsChaldren";
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
    path: "/LK",
    Component: LK,
    
  },
  {
    path: "/newsChildren",
    Component: newsChildren,
    
  },

]);
