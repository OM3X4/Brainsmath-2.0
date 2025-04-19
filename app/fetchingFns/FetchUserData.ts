export default async function fetchProfile() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${localStorage.getItem("token")}`
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MTA2MjA0LCJpYXQiOjE3NDUwOTkwMDQsImp0aSI6Ijg5YmNkMjE3Mzg3YzQyZmZhMzQ0ZmVjNTRmMmRkNzRiIiwidXNlcl9pZCI6M30.SqX6sQA8RXb0SGNw6WIb3Jj7UGO24OVgaAzaiFQIX00`
        }
    })

    const data = await response.json()

    console.log(data)
    return data
}