'use client'
import { FaEye } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaEyeSlash } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import React, { useState, useEffect } from 'react'
import { passwordShowType, loginType, signupType } from "../types/types";
import { useLogin } from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";


function isValidUsername(username: string) {
	return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}


function Authentication() {

	const { mutate: login } = useLogin();
	const { mutateAsync: register, error } = useRegister();

	const [passwordShow, setPasswordShow] = useState<passwordShowType>({ signup: false, signupver: false, login: false })
	const [loginData, setLoginData] = useState<loginType>({ username: "", password: "" })
	const [signupData, setSignupData] = useState<signupType>({ username: "", email: "", password: "", passwordver: "" })

	const [isUsernameTaken, setIsUsernameTaken] = useState<boolean>(false)
	const [isUsernameNotValid, setIsUsernameNotValid] = useState<boolean>(false)
	const [isEmailNotValid, setIsEmailNotValid] = useState<boolean>(false)
	const [isPasswordEqual, setIsPasswordEqual] = useState<boolean>(true)

	async function handleLogin() {
		const result = login(loginData)
	}

	async function handleRegister() {
		if (!isValidEmail(signupData.email) || !isValidUsername(signupData.username) || signupData.password != signupData.passwordver) return;

		try {
			await register({
				username: signupData.username,
				email: signupData.email,
				password: signupData.password,
			});
			login({ username: signupData.username, password: signupData.password });
		} catch (err: any) {
			if (err.message == "A user with that username already exists.") {
				setIsUsernameTaken(true)
			}
		}
	}
	useEffect(() => {
		if (isValidUsername(signupData.username) || signupData.username == "") {
			setIsUsernameNotValid(false)
		} else {
			setIsUsernameNotValid(true)
		}
	}, [signupData.username])

	useEffect(() => {
		if (isValidEmail(signupData.email) || signupData.email == "") {
			setIsEmailNotValid(false)
		} else {
			setIsEmailNotValid(true)
		}
	}, [signupData.email])

	useEffect(() => {
		if (!signupData.password || !signupData.passwordver) return;
		if (signupData.password == signupData.passwordver) {
			setIsPasswordEqual(true)
		} else {
			setIsPasswordEqual(false)
		}
	}, [signupData.passwordver])



	return (
		<>
			<div className=' w-screen flex flex-col md:flex-row mt-20 justify-center gap-y-10 gap-x-50 bg-background'>
				{/* Register */}
				<div className="flex items-center justify-center flex-col gap-5 text-white">
					<div className="flex items-center justify- gap-5 text-primary mb-3">
						<IoMdPersonAdd className="text-3xl" />
						<h1 className="text-2xl font-semibold">register</h1>
					</div>
					{isUsernameTaken && <p className="text-error text-sm flex items-center gap-3"><div className="size-2 rounded-full bg-error"></div>Username already taken</p>}
					<div className="relative">
						<input type="text" placeholder="username" className={`${isUsernameTaken && "border-error border-2 outline-error"}placeholder:italic bg-dark py-2 px-4 rounded-lg`}
							onChange={e => setSignupData(prev => ({ ...prev, username: e.target.value }))} />
						<ImCancelCircle className={`text-error text-sm flex items-center gap-3 absolute top-1/2 -translate-y-1/2 right-3 opacity-0 ${isUsernameNotValid && " opacity-100"}`} />
					</div>
					<div className="relative">
						<input type="email" placeholder="email" className="placeholder:italic bg-dark py-2 px-4 rounded-lg"
							onChange={e => setSignupData(prev => ({ ...prev, email: e.target.value }))} />
						<ImCancelCircle className={`text-error text-sm flex items-center gap-3 absolute top-1/2 -translate-y-1/2 right-3 opacity-0 ${isEmailNotValid && " opacity-100"}`} />
					</div>
					<div className="relative">
						<input type={passwordShow.signup ? "text" : "password"} placeholder="password" className="placeholder:italic bg-dark py-2 px-4 rounded-lg relative" onKeyDown={e => { if (e.key == " ") e.preventDefault() }}
							onChange={e => setSignupData(prev => ({ ...prev, password: e.target.value }))} />
						{passwordShow.signup ?
							<FaEyeSlash className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({ ...prev, signup: false }))} /> :
							<FaEye className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({ ...prev, signup: true }))} />}
					</div>
					{!isPasswordEqual && <p className="text-error text-sm flex items-center gap-3"><div className="size-2 rounded-full bg-error"></div>Passwords don't match</p>}
					<div className="relative">
						<input type={passwordShow.signupver ? "text" : "password"} placeholder="password" className="placeholder:italic bg-dark py-2 px-4 rounded-lg relative" onKeyDown={e => { if (e.key == " ") e.preventDefault() }}
							onChange={e => setSignupData(prev => ({ ...prev, passwordver: e.target.value }))} />
						{passwordShow.signupver ?
							<FaEyeSlash className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({ ...prev, signupver: false }))} /> :
							<FaEye className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({ ...prev, signupver: true }))} />}
					</div>
					<button
						data-cy="registerButton"
						onClick={handleRegister}
						className="bg-primary md:w-full py-2 px-4 rounded-lg cursor-pointer font-bold text-2xl hover:bg-white hover:text-black">Sign Up</button>
				</div>
				{/* Login */}
				<div className="flex items-center -center flex-col gap-5 text-white">
					<div className="flex items-center  gap-5 text-primary mb-3">
						<BiLogIn className="text-3xl" />
						<h1 className="text-2xl font-semibold">login</h1>
					</div>
					<input type="text" placeholder="username" className="placeholder:italic bg-dark py-2 px-4 rounded-lg"
						onChange={e => setLoginData(prev => ({ ...prev, username: e.target.value }))}
						data-cy="loginUsername"/>
					<div className="relative">
						<input type={passwordShow.login ? "text" : "password"} placeholder="password" className="placeholder:italic bg-dark py-2 px-4 rounded-lg relative"
							onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
							data-cy="loginPassword"/>
						{passwordShow.login ?
							<FaEyeSlash className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({ ...prev, login: false }))} /> :
							<FaEye className="absolute top-1/2 -translate-y-1/2 right-5 text-gray" onClick={e => setPasswordShow(prev => ({ ...prev, login: true }))} />}
					</div>
					<button className="bg-primary md:w-full py-2 px-4 rounded-lg cursor-pointer font-bold text-2xl hover:bg-white hover:text-black"
						data-cy="loginButton"
						onClick={handleLogin}>Sign In</button>

				</div>
			</div>
		</>
	)
}

export default Authentication