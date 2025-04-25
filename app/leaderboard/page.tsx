'use client'
import { FaChevronRight } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import React, { useEffect, useMemo, useState } from 'react'
import { useLeaderBoardData } from '../hooks/useLeaderBoardData'
import useProfileFetcher from "../hooks/useProfileFetcher";
import Loading from '../loading'
import formatDateTime from '../utils/dateFormaterLeaderboard'
import { FaCrown } from "react-icons/fa";
import { useUserRank } from "../hooks/useUserRank";

function Entity({ index, accuracy, creation, qpm, raw, username, isHeader, isMe, isOdd }: any) {

    const { date, time } = formatDateTime(creation);


    return (
        <div className={`rounded-md w-full h-fit flex items-center justify-between py-4 px-7 ${isHeader || isOdd ? "bg-background" : "bg-dark"}`}>
            <div className='flex items-center justify-center gap-5'>
                <div className={`text-md font-bold ${isHeader ? "text-gray" : isMe ? "text-primary" : "text-reverse"}`}>{index == "#" ? index : index == 0 ? <FaCrown /> : index + 1}</div>
                <div className={`text-md font-bold ${isHeader ? "text-gray" : isMe ? "text-primary" : "text-reverse"}`}>{username}</div>
            </div>
            <div className='flex items-center gap-10'>
                {/* <div className='text-reverse text-md font-bold'>{time}</div> */}
                <div className={`text-md font-bold ${isHeader ? "text-gray" : isMe ? "text-primary" : "text-reverse"}`}>{isHeader ? qpm : parseFloat(qpm).toFixed(1)}</div>
                <div className={`text-md font-bold ${isHeader ? "text-gray" : isMe ? "text-primary" : "text-reverse"}`}>{isHeader ? accuracy : parseFloat(accuracy).toFixed(0)}</div>
                <div className={`text-md font-bold ${isHeader ? "text-gray" : isMe ? "text-primary" : "text-reverse"}`}>{isHeader ? raw : parseFloat(raw).toFixed(0)}</div>
                <div className={`text-xs font-bold ${isHeader ? "text-gray" : isMe ? "text-primary" : "text-reverse"}`}>
                    {
                        isHeader ? "Date" :
                            <div className='flex flex-col items-end justify-end'>
                                <div>{date}</div>
                                <div className='opacity-50'>{time}</div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}


function Leaderboard() {

    const { data: userData } = useProfileFetcher();


    const [currentPage, setCurrentPage] = useState<number>(1)

    const { data: leaderboardData, isError, isLoading } = useLeaderBoardData(currentPage);
    const { data: userRankData } = useUserRank(userData?.username)

    useEffect(() => {
        if (!userData || !leaderboardData || !userRankData) return;

    }, [userData, leaderboardData , userRankData]);




    const userPage = () => setCurrentPage(Math.ceil(userRankData.index / 50))
    const goToFirstPage = () => setCurrentPage(1);
    const goToNextPage = () => setCurrentPage((prev) => {
        return (prev + 1);
    });
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    if (isLoading || isError) return <Loading />



    return (
        <div className='w-[60%] mx-auto mt-5'>
            <h1 className='text-reverse text-3xl font-bold my-8'>All-Time difficulty 5 60s Leaderboard</h1>
            {
                userData &&
                    userRankData ? <Entity index={userRankData.index - 1} username={userRankData.username} time={userRankData.time} qpm={userRankData.qpm} accuracy={userRankData.accuracy} raw={userRankData.raw} creation={userRankData.creation} isMe={true} /> : <div className='w-full my-5 rounded-2xl bg-dark  text-2xl py-4  h-fit text-center text-gray'>Not Qualified</div>
            }
            <div className="flex items-center justify-end mt-5 gap-2">
                <div className="p-2 bg-dark text-gray rounded-lg hover:bg-white hover:text-dark cursor-pointer"
                    onClick={goToFirstPage}
                ><FaCrown /></div>
                <div className={`p-2 bg-dark text-gray rounded-lg hover:bg-white hover:text-dark cursor-pointer
                    ${userRankData ? "" : "opacity-50 pointer-events-none"}`}
                    onClick={userPage}><FaUserAlt /></div>
                <div className="p-2 bg-dark text-gray rounded-lg hover:bg-white hover:text-dark cursor-pointer"
                    onClick={goToPrevPage}><FaChevronLeft /></div>
                <div className="p-2 bg-dark text-gray rounded-lg hover:bg-white hover:text-dark cursor-pointer"
                    onClick={goToNextPage}><FaChevronRight /></div>
            </div>
            <Entity index="#" username="username" time="time" qpm="qpm" accuracy="accuracy" raw="raw" creation="date" isHeader={true}
                className='mt-5' />
            {
                leaderboardData.results?.map((item: any, index: number) => {
                    if (userData && item.username == userData.username) {
                        return <Entity key={index} index={index} username={item.username} isOdd={index % 2 == 1}
                            time={item.time} qpm={item.qpm} accuracy={item.accuracy} raw={item.raw} creation={item.creation}
                            isMe={true} />
                    }
                    return (
                        <Entity
                            key={index}
                            index={(currentPage * 50) - 50 + index} isOdd={index % 2 == 1}
                            username={item.username} time={item.time} qpm={item.qpm} accuracy={item.accuracy} raw={item.raw}
                            creation={item.creation} />
                    )
                })
            }
        </div>
    )
}

export default Leaderboard