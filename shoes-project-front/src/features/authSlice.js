import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { endPoints } from "../api/endpoints"
import { handleError } from "../utils/handleError"
const initialState = {
    users: [],
    user: null,
    isAuthenticated: false,
    adminAuthenticated: false,
    loading: false,
    error : null,
    totalUsers: 0

}

//Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    
    try {
        const response = await axiosInstance.post(endPoints.AUTH.REGISTER, userData)
        
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {    
    try {
        const response = await axiosInstance.post(endPoints.AUTH.LOGIN, userData);
        console.log(response);
        
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // LoginUser 
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user;
                if (action.payload.user.role == 'admin') {
                    state.adminAuthenticated = true
                }
                if (action.payload.user.role == 'user') {
                    state.isAuthenticated = true
                }
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default authSlice.reducer