import {createTransport} from "nodemailer"
const nodemailerConifig=createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD

    }
})
export default nodemailerConifig