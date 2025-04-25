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

    return response;
}



export default function useUpdateUserSettings() {
    return useMutation({
        mutationFn: async (data : any) => {return await fetchUpdateUserSettings(data)},
        onError: (error) => {
            console.log("error : ",  error)
        },
        onSuccess: (data) => {
            console.log("updated" , data)
        },
        retry: 1
    })
}