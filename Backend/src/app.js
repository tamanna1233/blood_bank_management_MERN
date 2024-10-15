import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import patientRouter from "./routers/patient.routes.js"
import donorRouter from "./routers/donor.routes.js"
import AdminRouter from "./routers/admin.routes.js"
app.use("/api/v1/patient/",patientRouter)   
app.use("/api/v1/donor/",donorRouter)       
app.use("/api/v1/admin",AdminRouter)                                    
export {app}