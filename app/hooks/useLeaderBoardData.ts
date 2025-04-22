async function fetchLeaderBoardData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json();
    return result;
}

import { useQuery } from "@tanstack/react-query";

export function useLeaderBoardData() {
    return useQuery({
        queryFn: async () => {return await fetchLeaderBoardData()},
        queryKey: ["leaderboard"],
        staleTime: 60000 * 60
    })
}