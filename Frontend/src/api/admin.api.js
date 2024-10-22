import axios from "axios"
export const useAdminApi=()=>{
    const login =async(data)=>{
        console.log(data)
       try {
         const response =await axios.post("/api/v1/admin/login",{data},{
             headers :{
                 'accept':'application/json',
             }
         })
 
         return await response.data
       } catch (error) {
        console.log(error)
       }
    }

const currentuser=async()=>{
    const response =await axios.get("/api/v1/admin/currentuser")

    return response.data
}

const  donorlist=async()=>{
    const response=await axios.get("/api/v1/admin/donorlist")
    return response.data
}

const  organizationlist=async()=>{
    const response=await axios.get("/api/v1/admin/organizationlist")
    return response.data
}



    return {
        login,currentuser,donorlist,organizationlist
    }

}