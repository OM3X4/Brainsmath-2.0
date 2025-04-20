'use client'
// app/profile/[id]/page.tsx
import { useQuery } from "@tanstack/react-query";
import fetchProfile from "../fetchingFns/FetchUserData";
import Loading from "../loading";
import { formatDate } from "../utils/dateFormater";
import daysSince from "../utils/daysSince";


export default function ProfilePage() {


    const { data: userData, isLoading, isError } = useQuery({ queryKey: ["userData"], queryFn: fetchProfile });

    if (isLoading) return <Loading />;


    return (
        <section className="min-w-screen min-h-screen flex items-center justify- flex-col gap-10">
            <div className="w-[80%] mx-auto px-10 py-5 bg-dark rounded-2xl">
                <div className="flex items-center gap-5">
                    {/* img */}
                    <div className="size-20 bg-primary rounded-full"></div>
                    <div className="">
                        <h1 className="text-reverse text-2xl font-bold">@{userData.username}</h1>
                        {/* joining this website date */}
                        <div className="group relative flex items-center gap-5">
                            <h2 className="text-gray text-xs cursor-pointer">joined {formatDate(userData.date_joined)}</h2>

                            {/* Tooltip */}
                            <div className="w-fit text-nowrap absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-reverse text-background text-sm opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left z-10">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-reverse" />
                                {daysSince(userData.date_joined)} days ago
                            </div>
                        </div>
                        <h2 className="text-gray text-xs cursor-pointer">current streak: {userData.streak.user_streak} days</h2>
                    </div>
                    <div className="w-1 h-18 rounded-full bg-background"></div>
                    <div className="flex items-center justify-center gap-10">
                        <div>
                            <h1 className="text-sm text-gray ">Tests Started</h1>
                            <h1 className="text-reverse text-4xl font-medium">68,890</h1>
                        </div>
                        <div>
                            <h1 className="text-sm text-gray ">Tests Completed</h1>
                            <h1 className="text-reverse text-4xl font-medium">50,927</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[80%] mx-auto px-10 py-7 bg-dark rounded-2xl">
                <div className="flex items-center justify-around text-reverse gap-5 px-10" >
                    {
                        userData.best_scores.questions.map((score: any, index: any) => (
                            <div key={index}>
                                <p className="text-gray text-xs">{score.value} Questions</p>
                                <h1 className=" text-primary text-5xl font-bold">{score.test.qpm}</h1>
                            </div>
                        ))
                    }
                    <div className="h-30 w-2 rounded-full bg-reverse"></div>
                    {
                        userData.best_scores.time.map((score: any, index: any) => (
                            <div key={index}>
                                <p className="text-gray text-xs">{score.value} s</p>
                                <h1 className=" text-primary text-5xl font-bold">{score.test ? score.test.qpm : "-"}</h1>
                            </div>
                        ))


                    }
                </div>
            </div>
            <div className="w-[80%] mx-auto px-10 py-7 bg-dark rounded-2xl">
                <div className="flex items-center justify-around text-reverse gap-5" >
                    <h1 className="font-medium">All Time Difficulty 5 Leaderboard</h1>
                    <div>
                        <p className="text-gray">15s</p>
                        <h1 className="text-3xl font-bold">Not Qualified</h1>
                    </div>
                    <div>
                        <p className="text-gray">60s</p>
                        <h1 className="text-3xl font-bold">Not Qualified</h1>
                    </div>
                </div>
            </div>
        </section>
    );
}
