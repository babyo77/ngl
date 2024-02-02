import { user } from "@/interface"
import {createSlice} from "@reduxjs/toolkit"

const initialState:user|null = null

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state,action){
            state =  action.payload;
        }
    }
})


export const {setUser} = userSlice.actions
export default userSlice.reducer
