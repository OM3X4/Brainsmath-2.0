'use client'
import {useMutation} from "@tanstack/react-query";
import { LoginFetch } from "../fetchingFns/FetchLogin";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "../context/NotificationsContext";

export const useLogin = () => {

    const { addNotification } = useNotificationStore();

    const router = useRouter();

    return useMutation({
        mutationFn: async (login : { username: string; password: string; }) => {return await LoginFetch(login)},
        onSuccess: (data) => {
            localStorage.setItem("access_token" , data.access);
            localStorage.setItem("refresh_token" , data.refresh);
            router.push("/");
            addNotification({type: "success" , message: "Logged in successfully"});
        },
        onError: (error) => {console.log("error" , error)},
        retry: 1
    })
}