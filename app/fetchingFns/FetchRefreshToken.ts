export default async function(refresh_token: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refresh_token }),
    })
    const result = await response.json();
    if(response.ok) localStorage.setItem("access_token" , result.access);
    return result;
}