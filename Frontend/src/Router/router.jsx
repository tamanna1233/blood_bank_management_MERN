import { lazy, Suspense } from "react"
import {createBrowserRouter} from "react-router-dom"
import Footer from "../components/Footer"
const  Home  =lazy(()=>import("../components/Home"))
const Carousel= lazy(()=>import( "../components/Carousel"))
const  GetBlood =lazy(()=>import("../components/GetBlood")) 
const App =lazy(()=>import("../App"))
const Register=lazy(()=>import("../components/Donor_Register")) 
const Organization_register=lazy(()=>import('../components/Organization_register'))
const router=createBrowserRouter([
    {path:"/",
        element:<Suspense><App/> <Home/> <Carousel/> <GetBlood/> <Footer/></Suspense>,
        children:[
            {
path:"/Donor_Register",
element:<div><Register/></div>

        }
    //     {
    //         path:"/organization_register",
    //         element:<div><Organization_register/></div>
            
    //                 }
    ]

    }
])
export default router