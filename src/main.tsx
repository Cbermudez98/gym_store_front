import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/register",
    lazy: async () => {
      const Register = (await import("./components/registerForm/Register")).default;
      return {
        element: <Register/>
      }
    }
  },
  {
    path: "/confirmation/:jwt",
    lazy: async () => {
      const Confirmation = (await import("./components/confirmation/Confirmation.tsx")).default;
      return {
        element: <Confirmation/>
      }
    }
  },
  {
    path: "*",
    lazy: async () => {
      const NotFound = (await import("./components/notFound/NotFound.tsx")).default
      return {
        element: <NotFound/>
      }
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer/>
  </>,
)
