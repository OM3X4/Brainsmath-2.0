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
import { Question, BarSettingsType, ResultData, QuestionType } from "../types/types";
import calculateQPM from "../utils/qpm";



function Home() {
    const router = useRouter()
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [tracker, setTracker] = useState<boolean[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const [startTime, setStartTime] = useState<number | null>(null) // To Store Start Time
    const [elapsedTime, setElapsedTime] = useState<number>(0); // To store elapsed time

    const [TextFade, setTextFade] = useState<boolean>(true) // is text fading

    const [settings, setSettings] = useState<BarSettingsType>({ type: ["all"], number: 10, isTime: false }) // bar settings state

    const [isResult, setIsResult] = useState<boolean>(false) // is result page


    // result page data
    const [resultData, setResultData] = useState<ResultData>({ quantity: 60, time: 30000, type: ["all"], correct: 30, difficulty: 1, mode: "Questions" })

    // reset the timer and test
    const resetTest = () => {
        setStartTime(null);
        setElapsedTime(0);
        setTextFade(true);
        setIsResult(false);
        setTimeout(() => {
            setCurrentQuestion(0);
            setTracker(new Array(questions.length).fill(false));
            setAnswers(new Array(questions.length).fill(""));
            generateQuestions(settings);
        }, 100)
    }

    // generate new questions on settings change
    useEffect(() => {
        console.log(settings)
        resetTest();
    } , [settings])

    useEffect(() => {
        console.log(answers)
    } , [answers])

    // set Start Time
    useEffect(() => {
        if (!startTime && !currentQuestion && !isResult) {
            setStartTime(Date.now());
        }
    }, [currentQuestion, startTime, isResult])

    // set Elapsed Time
    useEffect(() => {
        if (startTime !== null) {
            const interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 100);

            // Clean up the interval when the component unmounts or test ends
            return () => clearInterval(interval);
        }
    }, [startTime]);

    const generateQuestions = (setting: BarSettingsType): void => {
        setTracker(new Array(setting.number).fill(false));
        setAnswers(new Array(setting.number).fill(""));
        setQuestions(generateRandomQuestions(setting.type, setting.number));
    }

    const changeSettingsType = (type: QuestionType): void => {
        if (type === "all") {
            setSettings(prev => ({ ...prev, type: ["all"] }))
            return;
        }
        setSettings(prev => {
            let newTypes = prev.type.includes(type)
                ? prev.type.filter(t => t !== type) // Remove type if it's already included
                : [...prev.type, type]; // Add type if it's not included
            newTypes = newTypes.filter(t => t !== "all");

            return { ...prev, type: newTypes };
        });

    };

    useEffect(() => {
        generateQuestions(settings)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setTextFade(false)
        }, 500)
    }, [TextFade])

    useEffect(() => console.log(settings), [settings])

    function handleKeyPress(e: KeyboardEvent) {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestion] = newAnswers[currentQuestion] + e.key;
                return newAnswers
            })
        } else if (e.key === "Backspace") {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestion] = newAnswers[currentQuestion].slice(0, -1);
                return newAnswers
            })
        } else if (e.key === " ") {
            if (isAnimating) return; // Prevent multiple transitions

            if (!answers[currentQuestion]) return // Prevent empty answers

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
                setResultData(prev => ({
                    ...prev,
                    type: settings.type,
                    quantity: questions.length,
                    time: elapsedTime,
                    correct: tracker.filter(t => t).length,
                    difficulty: calculateQPM(questions.length, elapsedTime)
                }))
                setTextFade(true);
                resetTest();
                setIsResult(true);

            }
        } else if (e.key == "Tab") {
            e.preventDefault()
            resetTest();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])

    return (
        <>
            {
                isResult ?

                    <div className=" h-[calc(100vh-300px)] w-full overflow-hidden flex items-center justify-center flex-col"
                        style={{ opacity: TextFade ? 0 : 1 }}>
                        <div className="flex flex-wrap items-center justify-center  gap-y-10">
                            <div className="w-1/2">
                                <p className="text-gray text-3xl">qpm</p>
                                <h1 className="text-primary text-9xl font-bold">{calculateQPM(resultData.correct, resultData.time).toFixed(0)}</h1>
                            </div>
                            <div className="w-1/2">
                                <p className="text-gray text-3xl">acc</p>
                                <h1 className="text-primary text-9xl font-bold">{((resultData.correct / resultData.quantity) * 100).toFixed(0)}%</h1>
                            </div>
                            <div className="w-1/2">
                                <p className="text-gray text-3xl">raw</p>
                                <h1 className="text-primary text-7xl font-bold">{calculateQPM(resultData.quantity, resultData.time).toFixed(0)}</h1>
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-gray text-2xl">Test Type</h3>
                                <h6 className="text-primary font-semibold text-3xl">{resultData.type.join(", ")}</h6>
                                <h6 className="text-primary font-semibold text-3xl">{resultData.quantity} {resultData.mode}</h6>
                            </div>
                        </div>
                        <div className="text-white text-5xl absolute bottom-20 left-1/2 -translate-x-1/2 ">
                            <MdOutlineRefresh className="cursor-pointer hover:text-primary"
                                onClick={e => {
                                    setTextFade(true);
                                    setTimeout(() => {
                                        setIsResult(false);
                                        setCurrentQuestion(0);
                                        setTracker(new Array(questions.length).fill(false));
                                        setAnswers(new Array(questions.length).fill(""));
                                        generateQuestions(settings);
                                    }, 100)
                                }} />
                        </div>
                    </div>

                    :
                    <>
                        <div className='flex gap-3 text-sm text-gray bg-dark w-fit py-3 px-6 rounded-lg mx-auto mt-5'>
                            <ul className='flex items-center justify-center gap-6'>
                                <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                                    style={{ color: settings.type.includes("all") ? "#5a65ea" : "#d1d0c5" }}
                                    onClick={e => changeSettingsType("all")}
                                ><BiMath />all</li>
                                <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                                    style={{ color: settings.type.includes("add") ? "#5a65ea" : "#d1d0c5" }}
                                    onClick={e => changeSettingsType("add")}
                                ><CgMathPlus />add</li>
                                <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                                    style={{ color: settings.type.includes("sub") ? "#5a65ea" : "#d1d0c5" }}
                                    onClick={e => changeSettingsType("sub")}
                                ><CgMathMinus />subtract</li>
                                <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                                    style={{ color: settings.type.includes("multiply") ? "#5a65ea" : "#d1d0c5" }}
                                    onClick={e => changeSettingsType("multiply")}
                                ><FaTimes />multiply</li>
                                <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                                    style={{ color: settings.type.includes("squares") ? "#5a65ea" : "#d1d0c5" }}
                                    onClick={e => changeSettingsType("squares")}
                                ><TbCircleNumber2 />square</li>
                                <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-white font-semibold"
                                    style={{ color: settings.type.includes("root") ? "#5a65ea" : "#d1d0c5" }}
                                    onClick={e => changeSettingsType("root")}
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


                        <div className="relative h-[calc(100vh-300px)] w-full overflow-hidden flex items-center justify-center"
                            style={{ opacity: TextFade ? 0 : 1 }}>

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
                                        scaleClass = "scale-50 ";
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
                        {
                            elapsedTime ?
                                <h1 className="text-center text-2xl text-gray font-bold">Time : <span className="text-4xl text-primary">{(elapsedTime / 1000).toFixed(0)}</span></h1>
                                : ""
                        }
                        <div className="text-white text-5xl flex items-center justify-center "
                            style={{ opacity: TextFade ? 0 : 1 }}>
                            <MdOutlineRefresh className="cursor-pointer hover:text-primary"
                                onClick={e => {
                                    resetTest();
                                }} />
                        </div>
                    </>
            }
        </>
    )
}

export default Home;