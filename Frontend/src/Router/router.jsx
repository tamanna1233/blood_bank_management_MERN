import { lazy, Suspense } from "react"
import {createBrowserRouter} from "react-router-dom"
import Details from "../components/Details"
import AboutUs from "../components/AboutUs"
import Admin_Login from "../components/Admin_Login"
import Admindashboard from "../components/Admindashboard"
const Register =lazy(()=>import("../components/register"))
// import Organization_register from "../components/Organization_register"
const  Home  =lazy(()=>import("../components/Home"))
const Carousel= lazy(()=>import( "../components/Carousel"))
const  GetBlood =lazy(()=>import("../components/GetBlood")) 
const App =lazy(()=>import("../App"))
const Organization_register=lazy(()=>import('../components/Organization_register'))
const Mission =lazy(()=>import("../components/Mission"))
const Donor_Register=lazy(()=>import("../components/Donor_Register"))
const router=createBrowserRouter([
    {path:"/",
        element:<Suspense><App/></Suspense>,
        children:[
            {
                path:"/",
                element:<div><Home/> <Mission/> <Carousel/> <GetBlood/> </div>
            },

            {
         path:"/Donor_Register",
         element:<Donor_Register/>

        },
        {
            path:"/Organization_register",
            element:<Organization_register/>
        },{
            path:"/aboutUs",
            element:<AboutUs/>
        },
        {
            path:"/find_blood",
            element:<Register/>

        },
        {
            path:"/details",
            element:<Details/>
        },
        {
            path:"/admin_login",
            element:<Admin_Login/>
        },
        {
            path:"/admin_dashboard",
            element:<Admindashboard/>
        }
   
    ]

    }
])
export default router