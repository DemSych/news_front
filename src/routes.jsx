import {createBrowserRouter, RouterProvider} from "react-router";
import Registration from "./components/pages/Registration/Registration";
import news from "./components/pages/news/news";
import LK from "./components/pages/LK/LK";
import auth from "./components/pages/auth/auth";
import newsChildren from "./components/pages/newsChildren/newsChaldren";
import Loader from "./components/pages/Loader/Loader";
import newNews from "./components/pages/newNews/newNews";
import deleteNews from "./components/pages/delete/deleteNews";
import newsRedact from "./components/pages/newsRedact/newsRedact";
import index from './components/pages/index/index';
import newsLike from "./components/pages/newsLike/newsLike";
import dashboard from './components/pages/dashboard/dashboard';
import users from './components/pages/users/users';
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
    path: "/newsChildren/:id",
    Component: newsChildren,
    
  },
  {
    path: "/loader",
    Component: Loader,
    
  },
  {
    path: "/newNews",
    Component: newNews,
    
  },
  {
  path: "/deleteNews/:id",
    Component: deleteNews,
   
  },
  {
  path: "/newsLike",
    Component: newsLike,
  },
  {
  path: "/newsRedact/:id",
    Component: newsRedact,
  },
  {
    path: "/registration",
    Component: Registration,
    
  },
  {
    path: "/dashboard",
    Component: dashboard,
    
  },
  {
    path: "/users",
    Component: users,
    
  },
]);
