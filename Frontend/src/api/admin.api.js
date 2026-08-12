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

const  hospitallist=async()=>{
   try {
     const response=await axios.get("/api/v1/admin/hospitallist")
     return response.data
   } catch (error) {
    return error.response
   }
}
const updateHospitalStatus = async (hospitalId, status) => {
    try {
        const response = await axios.put(`/api/v1/admin/hospital/${hospitalId}/status`, { status });
        return response.data;
    } catch (error) {
        if (error.response) return error.response.data;
        return error.message;
    }
}

    return {
        login,currentuser,donorlist,hospitallist,logout,updateHospitalStatus
    }

}