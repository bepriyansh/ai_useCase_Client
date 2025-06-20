import { apiClient } from "./axios";
import type { AuthResponse, LoginData, SignUpData } from "./types";

export const loginApi = async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export const signupApi = async (signupData: SignUpData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', signupData);
    return response.data;
};

export const logoutApi = async ()=>{
    const response = await apiClient.post('/auth/logout');
    return response.data;
}