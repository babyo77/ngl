import {configureStore}  from "@reduxjs/toolkit"
import { diceData } from "./diceData"

export const store = configureStore({
    reducer:{
        [diceData.reducerPath]:diceData.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(diceData.middleware),
})