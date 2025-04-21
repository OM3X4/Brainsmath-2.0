export async function LoginFetch(data: { username: string; password: string; }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const result = await response.json();
    console.log(result)
    return result;
}