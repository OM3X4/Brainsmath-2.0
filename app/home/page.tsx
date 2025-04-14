'use client'
import { FaTerminal } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";
import { CgMathPlus } from "react-icons/cg";
import { FaSquareRootAlt } from "react-icons/fa";
import { TbCircleNumber2 } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import { CgMathMinus } from "react-icons/cg";
import { PiGaugeBold } from "react-icons/pi";
import { BiMath } from "react-icons/bi";
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/navigation";
import { MdOutlineRefresh } from "react-icons/md";
import { generateRandomQuestions } from "../utils/questionGen";
import { Question, BarSettingsType, ResultData, QuestionType } from "../types/types";
import calculateQPM from "../utils/qpm";


import { useStopwatch, useTimer } from "react-timer-hook";

import { playRandomSound } from "../utils/useSoundPlayer";





function Home() {

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [tracker, setTracker] = useState<boolean[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const [TextFade, setTextFade] = useState<boolean>(true) // is text fading

    const [settings, setSettings] = useState<BarSettingsType>({ type: ["all"], number: 10, isTime: false, difficulty: 1 }) // bar settings state

    const [isResult, setIsResult] = useState<boolean>(false) // is result page



    // result page data
    const [resultData, setResultData] = useState<ResultData>({ quantity: 60, time: 30000, type: ["all"], correct: 30, difficulty: 1, mode: "Questions" })

    const { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp: new Date(),
        autoStart: false,
        onExpire: () => {
            setResultData({
                type: settings.type,
                difficulty: settings.difficulty,
                time: settings.number * 1000, // time in ms
                mode: "Time",
                quantity: answers.filter(a => a.length).length,
                correct: tracker.filter(a => a).length
            });
            resetTest();
            setIsResult(true);

        }
    });

    const stopTimer = useStopwatch({ autoStart: false });


    const startNewTimer = (durationInSeconds: number) => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + durationInSeconds);
        restart(time, true);
    };

    const renderTimer = () => {
        if (settings.isTime) {
            return (
                `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`
            );
        } else {
            return (
                `Time: ${(stopTimer.totalSeconds).toFixed(0)}s`
            );
        }
    };



    useEffect(() => {
        document.body.style.fontFamily = "var(--font-ibm)";
    }, []);

    // reset the timer and test
    const resetTest = () => {
        if (settings.isTime) {
            startNewTimer(settings.number);
        } else {
            stopTimer.reset(new Date(), true);
        }
        setTextFade(true);
        setIsResult(false);
        setTimeout(() => {
            setCurrentQuestion(0);
            generateQuestions(settings);
        }, 100)
    }

    // generate new questions on settings change
    useEffect(() => {
        resetTest();
    }, [settings])



    // set Start Time
    useEffect(() => {
        if (settings.isTime && !isResult && isRunning) {
            startNewTimer(settings.number);
        }
    }, [settings, isResult]);



    const generateQuestions = (setting: BarSettingsType): void => {
        if (setting.isTime) {
            setTracker(new Array(300).fill(false));
            setAnswers(new Array(300).fill(""));
            setQuestions(generateRandomQuestions(setting.type, 300, settings.difficulty));
        } else {
            setTracker(new Array(setting.number).fill(false));
            setAnswers(new Array(setting.number).fill(""));
            setQuestions(generateRandomQuestions(setting.type, setting.number, settings.difficulty));
        }
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

            if (newTypes.length === 0) {
                newTypes = ["all"];
            }

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

    const handleDifficultyChange = (): void => {
        if (settings.difficulty == 5) {
            setSettings(prev => ({ ...prev, difficulty: 1 }))
        } else {
            setSettings(prev => ({ ...prev, difficulty: prev.difficulty + 1 }))
        }
    }


    const handleKeyPress = React.useCallback((e: KeyboardEvent) => {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
            playRandomSound("click");
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

            if(answers[currentQuestion] != questions[currentQuestion].answer){
                playRandomSound("wrong");
            }
            playRandomSound("correct")

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
                if (!settings.isTime) {
                    setResultData(prev => ({
                        ...prev,
                        type: settings.type,
                        quantity: questions.length,
                        time: stopTimer.totalSeconds * 1000,
                        correct: tracker.filter(t => t).length,
                        difficulty: settings.difficulty
                    }))
                }
                setTextFade(true);
                resetTest();
                setIsResult(true);

            }
        } else if (e.key == "Tab") {
            e.preventDefault()
            resetTest();
        }else if(e.key != "Control" && e.key != "Alt" && e.key != "Shift"){
            playRandomSound("wrong");
        }
    }, [currentQuestion])

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
                        <div className="flex flex-wrap items-end  gap-20">
                            <div className="">
                                <p className="text-gray text-3xl">speed <span className="text-[8px]">(QPM × 3)</span></p>
                                <h1 className="text-primary text-9xl font-bold">{(calculateQPM(resultData.correct, resultData.time) * 3).toFixed(0)}</h1>
                            </div>
                            <div className="">
                                <p className="text-gray text-3xl">acc</p>
                                <h1 className="text-primary text-9xl font-bold">{((resultData.correct / resultData.quantity) * 100).toFixed(0)}%</h1>
                            </div>
                            <div className="">
                                <p className="text-gray text-3xl">raw</p>
                                <h1 className="text-primary text-7xl font-bold">{(calculateQPM(resultData.quantity, resultData.time) * 3).toFixed(0)}</h1>
                            </div>
                            <div className="">
                                <h3 className="text-gray text-2xl">Test Type</h3>
                                <h6 className="text-primary font-semibold text-xl">{resultData.type.join(", ")}</h6>
                                <h6 className="text-primary font-semibold text-xl">{settings.isTime ? resultData.time / 1000 : resultData.quantity} {resultData.mode}</h6>
                                <h6 className="text-primary font-semibold text-xl flex items-center  gap-3"><PiGaugeBold /> {resultData.difficulty}</h6>
                            </div>
                            <div className="">
                                <h3 className="text-gray text-2xl">Time </h3>
                                <span className="text-primary text-4xl font-bold ">{((resultData.time) / 1000).toFixed(0)}s</span>
                            </div>
                        </div>
                        <div className="text-white text-5xl absolute bottom-20 left-1/2 -translate-x-1/2 ">
                            <MdOutlineRefresh className="cursor-pointer hover:text-primary"
                                onClick={e => {
                                    resetTest();
                                }} />
                        </div>
                    </div>

                    :
                    <>
                        {
                            currentQuestion == 0 ?
                                <>
                                    <div className='flex gap-3 text-sm text-gray bg-dark w-fit py-3 px-6 rounded-lg mx-auto mt-5 mb-5'>
                                        <ul className='flex items-center justify-center gap-6'>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.type.includes("all") ? "text-primary" : "text-gray"}`}
                                                onClick={e => changeSettingsType("all")}
                                            ><BiMath />all</li>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.type.includes("add") ? "text-primary" : "text-gray"}`}
                                                onClick={e => changeSettingsType("add")}
                                            ><CgMathPlus />add</li>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.type.includes("sub") ? "text-primary" : "text-gray"}`}
                                                onClick={e => changeSettingsType("sub")}
                                            ><CgMathMinus />subtract</li>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.type.includes("multiply") ? "text-primary" : "text-gray"}`}
                                                onClick={e => changeSettingsType("multiply")}
                                            ><FaTimes />multiply</li>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.type.includes("squares") ? "text-primary" : "text-gray"}`}
                                                onClick={e => changeSettingsType("squares")}
                                            ><TbCircleNumber2 />square</li>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.type.includes("root") ? "text-primary" : "text-gray"}`}
                                                onClick={e => changeSettingsType("root")}
                                            ><FaSquareRootAlt />root</li>
                                        </ul>
                                        <span className='bg-background w-1 h-7 rounded-full'></span>
                                        <ul className='flex items-center justify-center gap-6'>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.isTime ? "text-primary" : "text-gray"}`}
                                                onClick={e => setSettings({ ...settings, isTime: true, number: 30 })}
                                            ><AiFillClockCircle />time</li>
                                            <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${!settings.isTime ? "text-primary" : "text-gray"}`}
                                                onClick={e => setSettings({ ...settings, isTime: false, number: 10 })}
                                            ><BsQuestionLg />questions</li>
                                        </ul>
                                        <span className='bg-background w-1 h-7 rounded-full'></span>

                                        <ul className='flex items-center justify-center gap-6'>
                                            {
                                                (settings.isTime ? [30, 60, 120, 180] : [5, 10, 15, 25]).map((item, index) => (
                                                    <li className={`flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold ${settings.number === item ? "text-primary" : "text-gray"}`}
                                                        onClick={e => setSettings({ ...settings, number: item })}
                                                        key={index}>{item}</li>
                                                ))
                                            }
                                            {/* <li className="flex items-center justify-center gap-1 cursor-pointer hover:text-text font-semibold">custom</li> */}
                                        </ul>
                                    </div>
                                    <div className="text-xl w-fit mx-auto mb-5 flex items-center justify-center gap-1 text-gray font-semibold hover:text-text cursor-pointer"
                                        onClick={handleDifficultyChange}>
                                        <PiGaugeBold /> difficulty: {settings.difficulty}
                                    </div>
                                </>

                                :
                                <div className="mx-auto w-fit flex items-center justify-center gap-10">
                                    <h1 className="text-primary text-5xl font-bold">{!settings.isTime ? `${currentQuestion}/${settings.number}` : ""}</h1>
                                    <h1 className="text-primary text-5xl font-bold">{renderTimer()}</h1>
                                </div>
                        }
                        <div className="relative h-[calc(100vh-400px)] w-full overflow-hidden flex items-center justify-center"
                            style={{ opacity: TextFade ? 0 : 1 }}>

                            <div
                                className="flex absolute transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(calc(50% - ${currentQuestion * 440}px - 200px))`
                                }}
                            >
                                {questions.slice(Math.max(0 , currentQuestion - 3) , Math.min(questions.length , currentQuestion + 3)).map((question, index) => {
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
                                                <div className={`${distance === 0 ? "text-white text-9xl" : tracker[index] ? "text-primary text-4xl" : "text-error text-4xl"} text-center mb-5 font-bold`}>
                                                    {answers[index]}
                                                </div>
                                                <div className={`h-1 ${distance === 0 ? "bg-primary w-2/3" : "bg-gray w-1/3"}`}></div>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                        <div className="text-gray text-5xl flex items-center justify-center "
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