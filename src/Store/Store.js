import { configureStore } from "@reduxjs/toolkit";
import authReducers from './Authslice'

const Store =  configureStore({
    reducer : {
      auth :  authReducers
    }
})


export default Store ;