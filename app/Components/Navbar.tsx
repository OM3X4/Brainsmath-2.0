import { TbCrown } from "react-icons/tb";
import React from 'react'
import { PiMathOperationsBold } from "react-icons/pi";

function Navbar() {



    return (
        <>
            <div className="flex justify-between items-center px-30 py-8">
                <div className="flex justify-center items-center gap-10">
                    <h1 className="text-primary font-bold text-4xl cursor-pointer">brainsmath</h1>
                    <PiMathOperationsBold className="text-4xl cursor-pointer text-white hover:text-primary"/>
                    <TbCrown className="text-4xl cursor-pointer text-white  hover:text-primary"/>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <div className="size-8 bg-primary rounded-full cursor-pointer"></div>
                    <p className="text-white font-bold text-xl cursor-pointer">User</p>
                </div>
            </div>
        </>
    )
}

export default Navbar