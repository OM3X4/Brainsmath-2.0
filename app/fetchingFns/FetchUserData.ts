import FetchRefreshToken from "./FetchRefreshToken";
export default async function fetchProfile() {

    if(!localStorage.getItem("access_token")) {return;}


    const accessToken = localStorage.getItem("access_token");

    async function getProfile(token: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        return res;
    }


    let response = await getProfile(accessToken!);

    if(localStorage.getItem("refresh_token")) FetchRefreshToken(localStorage.getItem("refresh_token")!);

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    return data;
}