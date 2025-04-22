import { useMutation } from "@tanstack/react-query";
import fetchRegister from "../fetchingFns/FetchRegister";

export default function useRegister(){
    return useMutation({
        mutationFn: async (data : { username: string; password: string; email: string }) => {return await fetchRegister(data)},
        onError: (error) => {
            console.log("error : ",  error)
        }
    })
}