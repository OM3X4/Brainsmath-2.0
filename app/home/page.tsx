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
import { MdOutlineRefresh } from "react-icons/md";
import { generateRandomQuestions } from "../utils/questionGen";
import { Question , BarSettingsType } from "../types/types";


function Home() {
    const router = useRouter()
    const [questions , setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [tracker, setTracker] = useState(new Array(18).fill(false));
    const [answers, setAnswers] = useState(new Array(18).fill(""));
    const [isAnimating, setIsAnimating] = useState(false);

    const [TextFade , setTextFade] = useState<boolean>(true)

    const [settings , setSettings] = useState<BarSettingsType>({type:["all"] , number:10 , isTime:false})


    const generateQuestions = () : void => {
        setQuestions(generateRandomQuestions(['all'] , 18));
    }

    const changeSettingsType = (type: string): void => {
        setSettings(prev => {
            const newTypes = prev.type.includes(type)
                ? prev.type.filter(t => t !== type) // Remove type if it's already included
                : [...prev.type, type]; // Add type if it's not included

            return { ...prev, type: newTypes };
        });

        generateQuestions();
    };

    useEffect(() => {
        generateQuestions()
    } , [])

    useEffect(() => {
        setTimeout(() => {
            setTextFade(false)
        } , 300)
    } , [TextFade])


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

            if(!answers[currentQuestion]) return // Prevent empty answers

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
    } , [handleKeyPress])

    return (
        <>
            {/* settings bar */}
            <div className='flex gap-3 text-sm text-gray bg-dark w-fit py-3 px-6 rounded-lg mx-auto mt-5'>
                <ul className='flex items-center justify-center gap-6'>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                    onClick={e =>}
                    ><BiMath />all</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                    onClick={e =>}
                    ><CgMathPlus />add</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                    onClick={e =>}
                    ><CgMathMinus />subtract</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                    onClick={e =>}
                    ><FaTimes />multiply</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                    onClick={e =>}
                    ><TbCircleNumber2 />square</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                    onClick={e =>}
                    ><FaSquareRootAlt />root</li>
                </ul>
                <span className='bg-background w-1 h-7 rounded-full'></span>
                <ul className='flex items-center justify-center gap-6'>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"><AiFillClockCircle />time</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"><BsQuestionLg />questions</li>
                </ul>
                <span className='bg-background w-1 h-7 rounded-full'></span>

                <ul className='flex items-center justify-center gap-6'>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold">5</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold">10</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold">25</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold">50</li>
                    <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold">custom</li>
                </ul>
            </div>

            {/* Carousel container */}
            <div className="relative h-[calc(100vh-300px)] w-full overflow-hidden flex items-center justify-center"
            style={{opacity: TextFade ? 0 : 1}}>
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
                                    {/* Nested Ternary Operator one to determine is question is right or wrong(inner) and the outter to determine if the question is the current one */}
                                    <div className={`${distance === 0 ? "text-white text-9xl" : tracker[index] ? "text-green-400 text-4xl" : "text-red-500 text-4xl"} text-center mb-5 font-bold`}>
                                        {answers[index]}
                                    </div>
                                    <div className={`h-1 ${distance === 0 ? "bg-primary w-2/3" : "bg-gray w-1/3"}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-white text-5xl flex items-center justify-center ">
                <MdOutlineRefresh className="cursor-pointer hover:text-primary"
                onClick={e => {
                    setCurrentQuestion(0);
                    setTracker(new Array(questions.length).fill(false));
                    setAnswers(new Array(questions.length).fill(""));
                    setTextFade(true);
                    generateQuestions();
                }}/>
            </div>
        </>
    )
}

export default Home