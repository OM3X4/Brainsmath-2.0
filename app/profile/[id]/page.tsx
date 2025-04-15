'use client'
// app/profile/[id]/page.tsx

interface ProfilePageProps {
    params: { id: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
    return (
        <section className="min-w-screen min-h-screen flex items-center justify- flex-col gap-10">
            <div className="w-[80%] mx-auto px-10 py-5 bg-dark rounded-2xl">
                <div className="flex items-center gap-5">
                    {/* img */}
                    <div className="size-20 bg-primary rounded-full"></div>
                    <div className="">
                        <h1 className="text-reverse text-2xl font-bold">@{params.id}</h1>
                        {/* joining this website date */}
                        <div className="group relative flex items-center gap-5">
                            <h2 className="text-gray text-xs cursor-pointer">joined 07 Jun 2023</h2>

                            {/* Tooltip */}
                            <div className="w-fit text-nowrap absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-reverse text-background text-sm opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left z-10">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-reverse" />
                                676 days ago
                            </div>
                        </div>
                        <h2 className="text-gray text-xs cursor-pointer">current streak: 134 days</h2>
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
