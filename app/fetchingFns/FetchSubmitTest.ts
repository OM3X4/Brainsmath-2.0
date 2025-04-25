import { TestSubmitType } from "../types/types";
import FetchRefreshToken from "./FetchRefreshToken";

export default async function fetchSubmitTest(data: TestSubmitType){
    if(!localStorage.getItem("access_token")) {return;}


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(data)
    })

    if(localStorage.getItem("refresh_token")){
        FetchRefreshToken(localStorage.getItem("refresh_token")!);
    }


    const result = await response.json()
    return result
}