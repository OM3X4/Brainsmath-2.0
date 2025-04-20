'use client'
import fetchProfile from './fetchingFns/FetchUserData';
import { MdOutlineRefresh } from "react-icons/md";



import React, { useState, useEffect, useRef } from 'react'
import { generateRandomQuestions } from "./utils/questionGen";
import { Question, BarSettingsType, ResultData, QuestionType } from "./types/types";
import Loading from './loading';
import SettingsBar from './Components/Home/SettingsBar';
import Result from './Components/Home/Result';

import { useQuery } from "@tanstack/react-query";

import { useStopwatch, useTimer } from "react-timer-hook";

import { playRandomSound } from "./utils/useSoundPlayer";





function Home() {

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [tracker, setTracker] = useState<boolean[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const [TextFade, setTextFade] = useState<boolean>(true) // is text fading

    const [settings, setSettings] = useState<BarSettingsType>({ type: ["all"], number: 10, isTime: false, difficulty: 1 }) // bar settings state

    const [isResult, setIsResult] = useState<boolean>(false) // is result page

    const { data: profile, isLoading } = useQuery({ queryKey: ['userData']  , queryFn: fetchProfile });

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
        if(isLoading) return;
        resetTest();
    }, [settings])



    // set Start Time
    useEffect(() => {
        if (settings.isTime && !isResult && !isLoading) {
            startNewTimer(settings.number);
        }
    }, [settings, isResult , !isLoading]);



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


    useEffect(() => {
        generateQuestions(settings)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setTextFade(false)
        }, 500)
    }, [TextFade])




    const handleKeyPress = React.useCallback((e: KeyboardEvent) => {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
            playRandomSound("click");
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestion] = newAnswers[currentQuestion] + e.key;
                console.log(e.key , newAnswers)
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

            console.log(answers)
            if (!answers[currentQuestion]) return // Prevent empty answers

            if(answers[currentQuestion] != questions[currentQuestion].answer){
                playRandomSound("wrong");
            }else{
                playRandomSound("correct")
            }

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
    }, [currentQuestion , answers])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])


    if (isLoading) return <Loading />;


    return (
        <>
            {
                isResult ?
                    <Result resultData={resultData} TextFade={TextFade} settings={settings} resetTest={resetTest} />

                    :
                    <>
                        {
                            currentQuestion == 0 ?
                                <SettingsBar settings={settings} setSettings={setSettings} />
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
                                                <h1 className={`${distance === 0 ? "text-primary text-8xl" : "text-gray text-5xl"} font-bold mb-10 text-center `}>
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