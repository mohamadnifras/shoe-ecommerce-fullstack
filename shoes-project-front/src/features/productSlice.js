import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    product: null,
    totalProducts: 0,
    currentPage: 1,
    totalPages: 0,
    loading: true,
    error: null,
    category: null,
}

const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page = 1 limit = 15, name, category) => {

    }
)
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase()
    }
})