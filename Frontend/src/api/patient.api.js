import axios from 'axios'
// import { Await } from 'react-router-dom'

export const usepatientApi=()=>{
    const loginPatient =async(user)=>{
        try{
    
    const response= await axios.post('/api/v1/patient/login',user,
        {
            headers: {
                'accept': 'application/json',
            }
        }

    )
    return await response.data
    }
    catch(error){

if (error.response){
    return error.response.data;
}
return(error.message)
}
}


// verify 
const verifyPatient = async (user) => {
    try {
        const response = await axios.get('/api/v1/patient/verifyOtp',user, {
            headers: {
                'accept': 'application/json',
                }
                }
                )
                return await response.data
                } catch (error) {
                    if (error.response) {
                        return error.response.data;
                        }
                        return (error.message)
                        }
                        }
                       

                        // logout

                const logout =async()=>{
                    try{
                        const response = await axios.post('/api/v1/patient/logout')
                        return response.data
                        }
                        catch(error){
                            if (error.response) {
                                return error.response.data;
                                }
                                return (error.message)
                                }

                }



                // find blood
                const findBlood = async (data) => {
                    try {
                        const response = await axios.get('/api/v1/blood//matchblood',data, {
                            headers: {
                                'accept': 'application/json',
                                }
                                }
                                )
                                return await response.data
                                } catch (error) {
                                    if (error.response) {
                                        return error.response.data;
                                        }
                                        return (error.message)
                                        }
                                    }
                                    return {findBlood,logout, verifyPatient,loginPatient}

                                }

