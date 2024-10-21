import axios from "axios"

export const useOrgainzationApi=()=>{

    const registerOrganization=async(data)=>{
    try {
         const response= await axios.post("/api/v1/orgainization/registerOrganization" ,data,{
            headers :{
                'accept':'application/json',
            }
         })
    
          return await response.data
    } catch (error) {
          if (error.response) {
                return error.response.data;
                }
                return (error.message)
                }
        
    }
    return { registerOrganization}
}