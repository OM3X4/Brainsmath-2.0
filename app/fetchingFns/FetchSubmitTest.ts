import { TestSubmitType } from "../types/types";
export default async function fetchSubmitTest(data: TestSubmitType){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    return result
}