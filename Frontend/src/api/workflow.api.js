import axios from "axios";

export const useWorkflowApi = () => {
    
    // Get all donation requests for admin
    const getDonationRequests = async () => {
        try {
            const response = await axios.get("/api/v1/workflow/donations", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    // Get all blood requests for admin
    const getBloodRequests = async () => {
        try {
            const response = await axios.get("/api/v1/workflow/blood-requests", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    // Update donation status (Approve/Reject/Complete)
    const updateDonationStatus = async (requestId, status, adminRemark) => {
        try {
            const response = await axios.put(`/api/v1/workflow/donation/${requestId}/status`, { status, adminRemark }, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    // Update blood request status (Approve/Reject)
    const updateBloodRequestStatus = async (requestId, status, adminRemark) => {
        try {
            const response = await axios.put(`/api/v1/workflow/blood-request/${requestId}/status`, { status, adminRemark }, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    // Issue blood
    const issueBlood = async (requestId, adminRemark) => {
        try {
            const response = await axios.post(`/api/v1/workflow/blood-request/${requestId}/issue`, { adminRemark }, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    // --- Hospital APIs ---
    const getHospitalDonationRequests = async () => {
        try {
            const response = await axios.get("/api/v1/workflow/hospital/donations", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const updateHospitalDonationStatus = async (requestId, status, adminRemark) => {
        try {
            const response = await axios.put(`/api/v1/workflow/hospital/donation/${requestId}/status`, { status, adminRemark }, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const getHospitalBloodRequests = async () => {
        try {
            const response = await axios.get("/api/v1/workflow/hospital/blood-requests", {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const updateHospitalBloodRequestStatus = async (requestId, status, adminRemark) => {
        try {
            const response = await axios.put(`/api/v1/workflow/hospital/blood-request/${requestId}/status`, { status, adminRemark }, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    const issueHospitalBlood = async (requestId, adminRemark) => {
        try {
            const response = await axios.post(`/api/v1/workflow/hospital/blood-request/${requestId}/issue`, { adminRemark }, {
                headers: { 'accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return error.message;
        }
    };

    return { 
        getDonationRequests, 
        getBloodRequests, 
        updateDonationStatus, 
        updateBloodRequestStatus, 
        issueBlood,
        getHospitalDonationRequests,
        updateHospitalDonationStatus,
        getHospitalBloodRequests,
        updateHospitalBloodRequestStatus,
        issueHospitalBlood
    };
};
