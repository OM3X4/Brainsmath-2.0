import React from 'react';
import Navbar from './Components/Navbar';
import Authentication from './authentication/page';
import {Ubuntu} from "next/font/google"

const ubuntu = Ubuntu({
    variable: "--font-ubuntu",
    weight: ["300", "400" , "500" , "700"]
})

function page() {
  return (
    <>
      <div className={`${ubuntu.className} bg-background w-screen h-screen overflow-hidden`}>

      </div>
    </>
  )
}

export default page