import { apiUrl } from "@/API/api";
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const diceData =createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:apiUrl
    }),
    endpoints:(builder)=>({
        getDetails: builder.query<string[],void>({
            query:()=>"dice",
            
    }),
    }),
});

export const {useGetDetailsQuery} = diceData