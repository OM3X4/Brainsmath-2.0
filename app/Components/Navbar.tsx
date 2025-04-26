'use client'
import { FaGear } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";import React , { useEffect } from 'react'
import { PiMathOperationsBold } from "react-icons/pi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import fetchProfile from "../fetchingFns/FetchUserData";
import { MdLogout } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import useProfileFetcher from "../hooks/useProfileFetcher";

function Navbar() {

    const { data: userData } = useProfileFetcher();
    const queryClient = useQueryClient();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }, []);


    return (
        <>
            <nav className="flex md:justify-between justify-around  items-center px-5 md:px-30 py-8">
                <div className="flex justify-center items-center gap-4 md:gap-10">
                    <Link href={'/'} prefetch={true}><h1 className="text-primary font-medium text-4xl cursor-pointer hidden md:block">brainsmath</h1></Link>
                    <Link href={'/'} prefetch={true}><PiMathOperationsBold className="text-2xl cursor-pointer text-gray hover:text-primary" /></Link>
                    <Link href={"/leaderboard"}><FaCrown className="text-2xl cursor-pointer text-gray  hover:text-primary" /></Link>
                    <Link href={"/settings"}><FaGear className="text-xl cursor-pointer text-gray  hover:text-primary" /></Link>

                </div>
                <div className="flex items-center justify-center gap-5">
                    <Link href={userData ? '/profile' : '/authentication'}>
                        <div className="flex items-center justify-center gap-3">
                            <div className="size-6 bg-primary rounded-full cursor-pointer"></div>
                            <p className="text-gray hover:text-white  text-md cursor-pointer">{userData ? userData.username : "Sign In"}</p>
                        </div>
                    </Link>
                    {userData ? <div onClick={() => {localStorage.clear();queryClient.setQueryData(['user'], null);window.location.href ='/authentication'}}><button className="text-white hover:text-primary cursor-pointer text-2xl mt-2"><MdLogout /></button></div> : ""}
                </div>
            </nav>
        </>
    )
}

export default Navbar