import { BiCodeAlt } from "react-icons/bi";
import React from 'react'

function Footer() {


    return (
        <footer className="mt-20 w-1/2 mx-auto flex items-center justify-center ">
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                <p className="flex items-center justify-center gap-2 text-text hover:text-gray cursor-pointer">
                    <BiCodeAlt /> Github
                </p>
            </a>
        </footer>
    )
}

export default Footer