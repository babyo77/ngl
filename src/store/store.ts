import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./features/userSlice"

const store = configureStore({
    reducer:{
        userInfo:userReducer
    }
})


export default store