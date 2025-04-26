import { useMutation } from "@tanstack/react-query";
import FetchRefreshToken from "../fetchingFns/FetchRefreshToken";

async function fetchUpdateUserSettings(data : any) {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

    if(response.refresh_token) FetchRefreshToken(response.refresh_token!);


    // if(!response.ok) throw new Error("Failed to update user settings");

    return response;
}
import useProfileFetcher from "./useProfileFetcher";


export default function useUpdateUserSettings() {

    const { refetch } = useProfileFetcher();


    return useMutation({
        mutationFn: async (data : any) => {return await fetchUpdateUserSettings(data)},
        onError: (error) => {
            console.log("error : ",  error)
        },
        onSuccess: (data) => {
            console.log("updated" , data),
            refetch();
        },
        retry: 1
    })
}