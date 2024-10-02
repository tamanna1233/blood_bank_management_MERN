import { lazy, Suspense } from "react"
import {createBrowserRouter} from "react-router-dom"
import Footer from "../components/Footer"
const  Home  =lazy(()=>import("../components/Home"))
const Carousel= lazy(()=>import( "../components/Carousel"))
const  GetBlood =lazy(()=>import("../components/GetBlood")) 
const App =lazy(()=>import("../App"))
const Register=lazy(()=>import("../components/Donor_Register")) 
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

        }
    ]

    }
])
export default router