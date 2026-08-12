import { lazy, Suspense } from "react"
import {createBrowserRouter} from "react-router-dom"
import Details from "../components/Details"
import AboutUs from "../components/AboutUs"
import Admin_Login from "../components/Admin_Login"
import Admindashboard from "../components/Admindashboard"
const Register =lazy(()=>import("../components/register"))
const HospitalLogin = lazy(() => import("../components/Hospital_Login"))
const HospitalDashboard = lazy(() => import("../components/Hospital_Dashboard"))
// import HospitalRegister from "../components/HospitalRegister"
const  Home  =lazy(()=>import("../components/Home"))
const Carousel= lazy(()=>import( "../components/Carousel"))
const  GetBlood =lazy(()=>import("../components/GetBlood")) 
const App =lazy(()=>import("../App"))
const HospitalRegister=lazy(()=>import('../components/HospitalRegister'))
const Mission =lazy(()=>import("../components/Mission"))
const Donor_Register=lazy(()=>import("../components/Donor_Register"))
const Donor_Login=lazy(()=>import("../components/Donor_Login"))
const Donor_Dashboard=lazy(()=>import("../components/Donor_Dashboard"))
const Patient_Dashboard=lazy(()=>import("../components/Patient_Dashboard"))
import Adminroute from "../components/adminroutemiddeleware"
import Patientroute from "../components/patientmidelware"
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
         path:"/donor_login",
         element:<Donor_Login/>
            },
            {
         path:"/donor_dashboard",
         element:<Donor_Dashboard/>
            },
            {
         path:"/patient_dashboard",
         element:<Patient_Dashboard/>
            },
        {
            path:"/HospitalRegister",
            element:<HospitalRegister/>
        },
        {
          path:"/hospital_login",
          element:<HospitalLogin/>
        },
        {
          path:"/hospital_dashboard",
          element:<HospitalDashboard/>
        },
        {
            path:"/aboutUs",
            element:<AboutUs/>
        },
        {
            path:"/find_blood",
            element:<Patientroute Authentication={false}><Register/></Patientroute>

        },
        {
            path:"/details",
            element:<Patientroute><Details/></Patientroute>
        },
        {
            path:"/admin_login",
            element:<Adminroute Authentication={false}><Admin_Login/></Adminroute>
        },
        {
            path:"/admin_dashboard",
            element:<Adminroute Authentication={true}><Admindashboard/></Adminroute> 
        }
   
    ]

    }
])
export default router