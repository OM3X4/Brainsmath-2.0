'use client'
import { FaGear } from "react-icons/fa6"; import { TbCrown } from "react-icons/tb";
import React , { useEffect } from 'react'
import { PiMathOperationsBold } from "react-icons/pi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import fetchProfile from "../fetchingFns/FetchUserData";


function Navbar() {

    const { data: userData } = useQuery({queryKey: ["userData"], queryFn: fetchProfile});

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }, []);


    return (
        <>
            <nav className="flex justify-between items-center px-30 py-8">
                <div className="flex justify-center items-center gap-10">
                    <Link href={'/'} prefetch={true}><h1 className="text-primary font-medium text-4xl cursor-pointer">brainsmath</h1></Link>
                    <Link href={'/'} prefetch={true}><PiMathOperationsBold className="text-3xl cursor-pointer text-gray hover:text-primary" /></Link>
                    <Link href={"/leaderboard"}><TbCrown className="text-3xl cursor-pointer text-gray  hover:text-primary" /></Link>
                    <Link href={"/settings"}><FaGear className="text-xl cursor-pointer text-gray  hover:text-primary" /></Link>

                </div>
                <Link href={userData ? '/profile' : '/authentication'}>
                    <div className="flex items-center justify-center gap-3">
                        <div className="size-6 bg-primary rounded-full cursor-pointer"></div>
                        <p className="text-gray hover:text-white  text-md cursor-pointer">{userData ? userData.username : "Sign In"}</p>
                    </div>
                </Link>
            </nav>
        </>
    )
}

export default Navbar