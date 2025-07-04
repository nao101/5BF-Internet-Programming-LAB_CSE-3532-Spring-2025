import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/actualhome/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CardDetails from "../Pages/CardDetails/CardDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import More from "../Pages/More/more";
import Admin from "../Pages/Admin/Admin";
import Contact from "../Pages/Contact/Contact";



const router = createBrowserRouter([
     {
         path : "/",
         element : <MainLayout></MainLayout>,
         errorElement:<ErrorPage></ErrorPage>,

         children : [
             {
                 path : "/",
                 element : <Home></Home>
             },
             {
                path: "/login",
                element: <Login></Login>
             },
             {
                path:"/signUp",
                element: <SignUp></SignUp>
             },
             { 
                path : "/more",
                element: <More></More>,
                //loader : ()=>fetch("http://localhost:5000/feedback")

             },
             {  
                path: "/services/:id",
                element:<PrivateRoute>  <CardDetails></CardDetails></PrivateRoute>,
                loader : ()=> fetch('/services.json')
             },
             {
               path : "/Admin",
               element:<Admin></Admin>
             },
             {
               path : "/Contact",
               element : <Contact></Contact>
             }

          
           
           
           

         ]
     }
])


export default router;