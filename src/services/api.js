import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import { API_BASE_URL } from "../config/aws-config";

const getAuthHeaders = async() => {
    try {
        const session = await fetchAuthSession();
        const token = session.tokens && session.tokens.idToken ?
            session.tokens.idToken.toString() :
            null;
        if (!token) throw new Error("No ID token found");
        return { Authorization: token };
    } catch (err) {
        console.error("Auth error:", err);
        throw err;
    }
};

const apiCall = async(endpoint) => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { headers });
    const data = response.data;

    // Lambda returns { statusCode, headers, body } where body is a JSON string
    // Parse body if it exists as a string
    if (data && typeof data.body === "string") {
        try {
            return JSON.parse(data.body);
        } catch (e) {
            console.error("Failed to parse body for", endpoint, e);
            return data;
        }
    }

    // Already parsed or direct response
    return data;
};

export const fetchAnalytics = () => apiCall("/analytics");
export const fetchHeadcount = () => apiCall("/headcount");
export const fetchLeaveUtilization = () => apiCall("/leave-utilization");
export const fetchRecruitmentFunnel = () => apiCall("/recruitment-funnel");
export const fetchAttritionRisk = () => apiCall("/attrition-risk");
export const fetchOrgChart = () => apiCall("/org-chart");