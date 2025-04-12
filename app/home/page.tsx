'use client'
import { AiFillClockCircle } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";
import { CgMathPlus } from "react-icons/cg";
import { FaSquareRootAlt } from "react-icons/fa";
import { TbCircleNumber2 } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import { CgMathMinus } from "react-icons/cg";
import { BiMath } from "react-icons/bi";
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

const questions = [
    {
        question: "66²",
        answer: "4356"
    },
    {
        question: "√3364",
        answer: "58"
    },
    {
        question: "930 + 920",
        answer: "1850"
    },
    {
        question: "4 - 2",
        answer: "2"
    },
    {
        question: "16 - 2",
        answer: "14"
    },
    {
        question: "99 - 2",
        answer: "97"
    },
    {
        question: "66²",
        answer: "4296"
    },
    {
        question: "√3364",
        answer: "58"
    },
    {
        question: "930 + 920",
        answer: "1750"
    },
    {
        question: "4 - 2",
        answer: "2"
    },
    {
        question: "16 - 2",
        answer: "14"
    },
    {
        question: "99 - 2",
        answer: "97"
    },
    {
        question: "66²",
        answer: "4296"
    },
    {
        question: "√3364",
        answer: "58"
    },
    {
        question: "930 + 920",
        answer: "1750"
    },
    {
        question: "4 - 2",
        answer: "2"
    },
    {
        question: "16 - 2",
        answer: "14"
    },
    {
        question: "99 - 2",
        answer: "97"
    },
]

function Home() {
    const router = useRouter()
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [tracker, setTracker] = useState(new Array(18).fill(false));
    const [answers, setAnswers] = useState(new Array(18).fill(""));
    const [isAnimating, setIsAnimating] = useState(false);


    useEffect(() => {
        console.log(tracker)
    })


    function handleKeyPress(e: KeyboardEvent) {
        if (["0","1","2","3","4","5","6","7","8","9"].includes(e.key)) {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestion] = newAnswers[currentQuestion] + e.key;
                return newAnswers
            })
        } else if (e.key === "Backspace") {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestion] = newAnswers[currentQuestion].slice(0,-1);
                return newAnswers
            })
        } else if (e.key === " ") {
            if (isAnimating) return; // Prevent multiple transitions

            if (currentQuestion < questions.length - 1) {
                setTracker(prev => {
                    const newTracker = [...prev];
                    newTracker[currentQuestion] = questions[currentQuestion].answer === answers[currentQuestion];
                    return newTracker
                })


                // Change question after a brief delay to allow animation to start
                setTimeout(() => {
                    setCurrentQuestion(prev => prev + 1);

                    // Reset animation flag after transition completes
                    setTimeout(() => {
                        setIsAnimating(false);
                    }, 300); // Match this with CSS transition duration
                }, 50);
            } else {
                router.push("/score")
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    })

    return (
        <>
            {/* settings bar */}
            <div className='flex gap-3 text-sm text-gray bg-dark w-fit py-3 px-6 rounded-lg mx-auto mt-5'>
                <ul className='flex items-center justify-center gap-6'>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><BiMath />all</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><CgMathPlus />add</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><CgMathMinus />subtract</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><FaTimes />multiply</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><TbCircleNumber2 />square</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><FaSquareRootAlt />root</li>
                </ul>
                <span className='bg-background w-1 h-7 rounded-full'></span>
                <ul className='flex items-center justify-center gap-6'>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><AiFillClockCircle />time</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white"><BsQuestionLg />questions</li>
                </ul>
                <span className='bg-background w-1 h-7 rounded-full'></span>

                <ul className='flex items-center justify-center gap-6'>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white">5</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white">10</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white">25</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white">50</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white">custom</li>
                </ul>
            </div>

            {/* Carousel container */}
            <div className="relative h-[calc(100vh-300px)] w-full overflow-hidden flex items-center justify-center">
                <div
                    className="flex absolute transition-transform duration-400 ease-out"
                    style={{
                        transform: `translateX(calc(50% - ${currentQuestion * 440}px - 200px))`
                    }}
                >
                    {questions.map((question, index) => {
                        // Determine distance from current question
                        const distance = Math.abs(index - currentQuestion);
                        let opacityClass = "opacity-10";
                        let scaleClass = "scale-30";
                        let zIndexClass = "z-0";

                        if (distance === 0) {
                            opacityClass = "opacity-100";
                            scaleClass = "scale-100";
                            zIndexClass = "z-10";
                        } else if (distance === 1) {
                            opacityClass = "opacity-50";
                            scaleClass = "scale-75";
                            zIndexClass = "z-5";
                        } else if (distance === 2) {
                            opacityClass = "opacity-30";
                            scaleClass = "scale-50";
                            zIndexClass = "z-1";
                        }

                        return (
                            <div
                                key={index}
                                className={`w-[400px] mx-5 flex flex-col items-center justify-center transition-all duration-400 ease-in-out origin-center flex-shrink-0 flex-grow-0 ${opacityClass} ${scaleClass} ${zIndexClass}`}
                            >
                                <div className="flex flex-col items-center w-full">
                                    <h1 className={`${distance === 0 ? "text-primary text-8xl" : "text-gray text-5xl"} font-bold mb-10 text-center`}>
                                        {question.question}
                                    </h1>
                                    <div className={`${distance === 0 ? "text-white text-9xl" : "text-green-400 text-3xl"} text-center mb-5 font-bold`}>
                                        {answers[index]}
                                    </div>
                                    <div className={`w-full h-1 ${distance === 0 ? "bg-primary" : "bg-gray"}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Home