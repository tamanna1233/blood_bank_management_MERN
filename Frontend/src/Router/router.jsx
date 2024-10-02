import { lazy, Suspense } from "react"
import {createBrowserRouter} from "react-router-dom"
const Find_Blood =lazy(()=>import("../components/Find_Blood"))
// import Organization_register from "../components/Organization_register"
const  Home  =lazy(()=>import("../components/Home"))
const Carousel= lazy(()=>import( "../components/Carousel"))
const  GetBlood =lazy(()=>import("../components/GetBlood")) 
const App =lazy(()=>import("../App"))
const Register=lazy(()=>import("../components/Donor_Register")) 
const Organization_register=lazy(()=>import('../components/Organization_register'))
const Mission =lazy(()=>import("../components/Mission"))
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
         element:<div><Register/></div>

        },
        {
            path:"/Organization_register",
            element:<Organization_register/>
        },
        {
            path:"/find_blood",
            element:<Find_Blood/>

        }
   
    ]

    }
])
export default router