'use client'
import React, { useEffect } from 'react'
import { useLeaderBoardData } from '../hooks/useLeaderBoardData'
import { useQuery } from '@tanstack/react-query'
import fetchProfile from '../fetchingFns/FetchUserData'
import Loading from '../loading'

function Entity({index , accuracy , creation , qpm , raw , time , username} : any){
    return(
        <div className='w-full bg-dark h-fit'>
            <h1 className='text-reverse text-2xl font-bold'>{index+1}</h1>
            <h1 className='text-reverse text-2xl font-bold'>{username}</h1>
            <h1 className='text-reverse text-2xl font-bold'>{time}</h1>
            <h1 className='text-reverse text-2xl font-bold'>{qpm}</h1>
        </div>
    )
}


function Leaderboard() {

    const { data: userData  } = useQuery({queryKey: ["userData"], queryFn: fetchProfile});

    const { data: leaderboardData , isLoading } = useLeaderBoardData();



    useEffect(() => {
        if(isLoading) return
        leaderboardData.filter((item : any) => item.username == userData.username)[0]
    }, [leaderboardData])

    if(isLoading) return <Loading />


    return (
        <div className='w-[55%] mx-auto mt-5'>
            <h1 className='text-reverse text-3xl font-bold'>All-Time Mixed 60s Leaderboard</h1>
            {leaderboardData.filter((item : any) => item.username == userData.username)[0] ? <Entity index={leaderboardData.indexOf(leaderboardData.filter((item : any) => item.username !== userData.username)[0])} /> : <div className='w-full bg-dark text-dark text-6xl h-fit'> text</div>}
        </div>
    )
}

export default Leaderboard