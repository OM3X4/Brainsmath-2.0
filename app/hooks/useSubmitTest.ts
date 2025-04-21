'use client'
import fetchSubmitTest from "../fetchingFns/FetchSubmitTest";
import { useMutation } from "@tanstack/react-query";
import { TestSubmitType } from "../types/types";

export const useSubmitTest = () => {
    return useMutation({
        mutationFn: async (data : TestSubmitType) => {return await fetchSubmitTest(data)},
        onSuccess: (data) => {console.log("sumbitted" , data)},
        onError: (error) => {console.log("error" , error)},
        retry: 1
    })
}