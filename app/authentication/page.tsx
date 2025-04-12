'use client'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import React , { useState , useEffect} from 'react'
import { passwordShowType , loginType , signupType } from "../types/types";


function Authentication() {


  const [passwordShow, setPasswordShow] = useState<passwordShowType>({signup:false , signupver:false , login:false})
  const [loginData , setLoginData] = useState<loginType>({username:"" , password:""})
  const [signupData , setSignupData] = useState<signupType>({username:"" , email:"" , password:"" , passwordver:""})



  return (
    <>
        <div className=' w-screen flex mt-20 justify-center gap-50 bg-background'>
            <div className="flex flex-col gap-5 text-white">
                <div className="flex items-center justify- gap-5 text-primary mb-3">
                    <IoMdPersonAdd className="text-3xl"/>
                    <h1 className="text-2xl font-semibold">register</h1>
                </div>
                <input type="text" placeholder="username" className="placeholder:italic bg-dark py-2 px-4 rounded-lg"
                onChange={e => setSignupData(prev => ({...prev , username:e.target.value}))}/>
                <input type="email" placeholder="email" className="placeholder:italic bg-dark py-2 px-4 rounded-lg"
                onChange={e => setSignupData(prev => ({...prev , email:e.target.value}))}/>
                <div className="relative">
                  <input type={passwordShow.signup ? "text" : "password"} placeholder="password" className="placeholder:italic bg-dark py-2 px-4 rounded-lg relative"
                  onChange={e => setSignupData(prev => ({...prev , password:e.target.value}))}/>
                  {passwordShow.signup ?
                  <FaEyeSlash className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({...prev , signup:false}))}/> :
                  <FaEye className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({...prev , signup:true}))}/>}
                </div>
                <div className="relative">
                  <input type={passwordShow.signupver ? "text" : "password"} placeholder="password" className="placeholder:italic bg-dark py-2 px-4 rounded-lg relative"
                  onChange={e => setSignupData(prev => ({...prev , passwordver:e.target.value}))}/>
                  {passwordShow.signupver ?
                  <FaEyeSlash className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({...prev , signupver:false}))}/> :
                  <FaEye className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({...prev , signupver:true}))}/>}
                </div>
                <button className="bg-primary py-2 px-4 rounded-lg cursor-pointer font-bold text-2xl hover:bg-white hover:text-black">Sign Up</button>
            </div>
            <div className="flex flex-col gap-5 text-white">
              <div className="flex items-center justify- gap-5 text-primary mb-3">
                <BiLogIn className="text-3xl"/>
                <h1 className="text-2xl font-semibold">login</h1>
              </div>
              <input type="text" placeholder="username" className="placeholder:italic bg-dark py-2 px-4 rounded-lg"
              onChange={e => setLoginData(prev => ({...prev , username:e.target.value}))}/>
              <div className="relative">
                <input type={passwordShow.login ? "text" : "password"} placeholder="password" className="placeholder:italic bg-dark py-2 px-4 rounded-lg relative"
                onChange={e => setLoginData(prev => ({...prev , password:e.target.value}))}/>
                {passwordShow.login ?
                <FaEyeSlash className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({...prev , login:false}))}/> :
                <FaEye className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({...prev , login:true}))}/>}
              </div>
              <button className="bg-primary py-2 px-4 rounded-lg cursor-pointer font-bold text-2xl hover:bg-white hover:text-black">Sign In</button>

            </div>
        </div>
    </>
  )
}

export default Authentication