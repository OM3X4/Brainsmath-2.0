async function fetchLeaderBoardData(pageParam : number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/?page=${pageParam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json();
    return result;
}
import { useQuery } from "@tanstack/react-query";

export function useLeaderBoardData(pageParam : number) {
    return useQuery({
        queryKey: ["leaderboard" , pageParam],
        queryFn: async () => {return await fetchLeaderBoardData(pageParam)},
        staleTime: 60000 * 60
    })
}