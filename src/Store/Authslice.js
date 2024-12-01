import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    searchterm : '',
}

const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        Setsearchterm : (state , action) =>{
            state.searchterm = action.payload
        }
    }
})


export const { login, logout  , Setsearchterm} = authslice.actions;

export default authslice.reducer;