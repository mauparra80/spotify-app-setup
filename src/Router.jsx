import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Callback from "./pages/Callback";

//create layout to expand for header/footer
const Layout = () => {

  return (
    <>
      <Outlet />
    </>
  )
}

export default function Router() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      //pages here
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/callback',
          element: <Callback />,
        },
        //catch all route for 404 
        {
          path: '*',
          element: <ErrorPage />,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}