import axios from "axios";

export const useInventoryApi = () => {
    const getInventory = async () => {
        try {
            const response = await axios.get("/api/v1/inventory", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const getTransactionHistory = async () => {
        try {
            const response = await axios.get("/api/v1/inventory/transactions", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const adjustInventory = async (data) => {
        try {
            const response = await axios.post("/api/v1/inventory/adjust", data, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const getHospitalInventory = async () => {
        try {
            const response = await axios.get("/api/v1/inventory/hospital", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    return { getInventory, getTransactionHistory, adjustInventory, getHospitalInventory };
};
