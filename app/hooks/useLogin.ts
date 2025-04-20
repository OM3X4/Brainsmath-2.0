'use client'
import {useMutation} from "@tanstack/react-query";
import { LoginFetch } from "../fetchingFns/FetchLogin";
import { useRouter } from "next/navigation";
import useProfileFetcher from "./useProfileFetcher";

export const useLogin = () => {

    const profileFetcher = useProfileFetcher();
    const router = useRouter();

    return useMutation({
        mutationFn: async (login : { username: string; password: string; }) => {return await LoginFetch(login)},
        onSuccess: (data) => {
            console.log("sumbitted" , data);
            localStorage.setItem("access_token" , data.access);
            localStorage.setItem("refresh_token" , data.refresh);
            router.push("/");
        },
        onError: (error) => {console.log("error" , error)}
    })
}