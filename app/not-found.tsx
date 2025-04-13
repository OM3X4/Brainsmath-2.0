import { AiFillHome } from "react-icons/ai";
import Link from 'next/link'

export const metadata = {
    title: '404 | brainsmath',
};

export default function NotFound() {
    return (
        <div className='w-screen h-[calc(100vh-15rem)] flex justify-center items-center flex-col'>
            <h1 className='text-9xl text-primary font-bold '>404 <span className='italic text-lg font-thin'>- Page Not Found</span></h1>
            <p className='text-2xl font-semibold text-secondry mt-10'>I Think We Don't Have What Are You Searching For</p>
            <Link href={'/home'} prefetch={true} className='bg-dark text-white px-5 py-4 rounded-lg mt-5 flex items-center justify-center text-2xl font-semibold gap-5 hover:text-secondry hover:bg-primary'><AiFillHome />Go Home</Link>
        </div>
    )
}