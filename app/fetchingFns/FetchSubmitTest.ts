import { TestSubmitType } from "../types/types";
import FetchRefreshToken from "./FetchRefreshToken";

export default async function fetchSubmitTest(data: TestSubmitType){
    console.log("submitting test")
    if(!localStorage.getItem("access_token")) {console.log("no token");return;}


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
    console.log(result)
    return result
}