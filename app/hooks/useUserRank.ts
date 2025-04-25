export async function fetchUserRank(username: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userrank/?user=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json();
    return result.result[0];
}

import { useQuery } from "@tanstack/react-query";

export function useUserRank(username: any) {
    return useQuery(
        {
            queryKey: ["userrank", username],
            queryFn: () => fetchUserRank(username),
            staleTime: 60000,
            enabled: !!username
        }
    )
}