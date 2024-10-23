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
        return error.response
       }
    }

    const logout = async()=>{
        console.log("clicked")
        try {
            const response =await axios.get("/api/v1/admin/logout",{
                headers :{
                    'accept':'application/json',
                }
            })
            console.log("clicked in")
        console.log(response.data)
            return  response.data
          } catch (error) {
            console.log("clicke erroe")
           return error.response
          }
    }
const currentuser=async()=>{
    try {
        const response =await axios.get("/api/v1/admin/getcurentuser")
    
        return response.data
    } catch (error) {
        return error.response
    }
}

const  donorlist=async()=>{try {
    
        const response=await axios.get("/api/v1/admin/donorlist")
        return response.data
} catch (error) {
    return error.response
    
}
}

const  organizationlist=async()=>{
   try {
     const response=await axios.get("/api/v1/admin/organizationlist")
     return response.data
   } catch (error) {
    return error.response
   }
}



    return {
        login,currentuser,donorlist,organizationlist,logout
    }

}