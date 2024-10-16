import axios  from "axios";

export const useDonorApi=()=>{
    const donorRegister=async(user) =>{
        console.log(user)
        try{
            const response = await axios.post('/api/v1/donor/register',user,
                {
                    headers :{
                        'accept':'application/json',
                    }
                }
               )
               console.log(response)
               return await response.data;
               }
               catch(error){
                if(error.response){
                    return error.response.data;

                }
                return(error.message)
            }}
            // ===========login 
           const loginDonor =async (user)=>{
            try{
                const response = await axios.post('/api/v1/donor/login',user,
                    {
                        headers :{
                            'accept':'application/json',

                        }

                    }
                )
                return await response.data;

           } 
           catch (error){
            if(error.response){
                return error.response.data;
            }
            return(error.message)
           }}


           
                        // logout

                        const logout =async()=>{
                            try{
                                const response = await axios.post('/api/v1/donor/logout')
                                return response.data
                                }
                                catch(error){
                                    if (error.response) {
                                        return error.response.data;
                                        }
                                        return (error.message)
                                        }

                        }
                        return{donorRegister,loginDonor,logout}
    }