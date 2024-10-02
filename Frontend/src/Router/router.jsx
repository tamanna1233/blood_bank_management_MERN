import { lazy, Suspense } from "react"
import {createBrowserRouter} from "react-router-dom"
import Footer from "../components/Footer"
// import Organization_register from "../components/Organization_register"
const  Home  =lazy(()=>import("../components/Home"))
const Carousel= lazy(()=>import( "../components/Carousel"))
const  GetBlood =lazy(()=>import("../components/GetBlood")) 
const App =lazy(()=>import("../App"))
const Register=lazy(()=>import("../components/Donor_Register")) 
const Organization_register=lazy(()=>import('../components/Organization_register'))
const router=createBrowserRouter([
    {path:"/",
        element:<Suspense><App/></Suspense>,
        children:[
            {
                path:"/",
                element:<div><Home/> <Carousel/> <GetBlood/> </div>
            },

            {
         path:"/Donor_Register",
         element:<div><Register/></div>

        },
        {
            path:"/Organization_register",
            element:<Organization_register/>
        }
   
    ]

    }
])
export default router