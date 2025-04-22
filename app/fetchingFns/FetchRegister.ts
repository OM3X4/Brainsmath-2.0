export default async function fetchRegister(data: { username: string; password: string; email: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })


    const result = await response.json();

    if (!response.ok) {
        // 👇 Make sure you throw an Error so `useMutation` can catch it
        throw {
            status: response.status,
            data: result,
            message: result?.username?.[0] || result?.email?.[0] || result?.detail || "Registration failed",
        };
    }

    // if(response.status === 400 && result.username){
    //     return 0;
    // }
    return result;
}