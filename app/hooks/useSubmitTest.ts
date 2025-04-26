'use client'
import fetchSubmitTest from "../fetchingFns/FetchSubmitTest";
import { useMutation } from "@tanstack/react-query";
import { TestSubmitType } from "../types/types";
import { useNotificationStore } from "../context/NotificationsContext";

export const useSubmitTest = () => {

    const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    const { addNotification } = useNotificationStore();

    return useMutation({
        mutationFn: async (data : TestSubmitType) => {return await fetchSubmitTest(data)},
        onSuccess: (data) => {
            console.log("sumbitted" , data)
            addNotification({type: "success" , message: "Test submitted successfully"});

        },
        onError: (error) => {console.log("error" , error)},
        retry: 1
    })
}