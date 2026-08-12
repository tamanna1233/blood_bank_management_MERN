import axios from "axios";

export const useHospitalApi = () => {
    const registerHospital = async (data) => {
        try {
            const response = await axios.post("/api/v1/hospital/register", data, {
                headers: {
                    accept: "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
            return { message: error.message };
        }
    };

    const loginHospital = async (credentials) => {
        try {
            const response = await axios.post("/api/v1/hospital/login", credentials, {
                headers: {
                    accept: "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
            return { message: error.message };
        }
    };

    return { registerHospital, loginHospital };
};