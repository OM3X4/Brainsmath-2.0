'use client'
//icons
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
import { MdOutlineRefresh } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

// components
import { generateRandomQuestions } from "./utils/questionGen";
import { Question, BarSettingsType, ResultData, QuestionType, TestSubmitType } from "./types/types";
import calculateQPM from "./utils/qpm";
import Loading from './loading';
import { useSubmitTest } from "./hooks/useSubmitTest";
import useKeyPressHandler from "./hooks/useKeyPressHandler";
import useProfileFetcher from "./hooks/useProfileFetcher";

// libraries
import React, { useState, useEffect, useRef } from 'react'
import { useStopwatch, useTimer } from "react-timer-hook";
import { Drawer, DrawerTrigger, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import DrawerComponent from "./Components/Home/Drawer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";


function Home() {

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [tracker, setTracker] = useState<boolean[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [TextFade, setTextFade] = useState<boolean>(true) // is text fading
    const [settings, setSettings] = useState<BarSettingsType>({ type: ["all"], number: 10, isTime: false, difficulty: 0 }) // bar settings state
    const [isResult, setIsResult] = useState<boolean>(false) // is result page
    const { data: profile, isLoading } = useProfileFetcher();
    const { mutate: submitTest, isSuccess } = useSubmitTest();
    // result page data
    const [resultData, setResultData] = useState<ResultData>({ quantity: 60, time: 30000, type: ["all"], correct: 30, difficulty: 1, mode: "questions" })
    const { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp: new Date(),
        autoStart: false,
        onExpire: () => {
            setResultData({
                type: settings.type,
                difficulty: settings.difficulty,
                time: settings.number * 1000, // time in ms
                mode: "time",
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
        if (isLoading) return;
        resetTest();
    }, [settings, isLoading])

    // set Start Time
    useEffect(() => {
        if (settings.isTime && !isResult && !isLoading) {
            startNewTimer(settings.number);
        }
    }, [settings, isResult, isLoading]);

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
            setSettings(prev => ({ ...prev, difficulty: 0 }))
        } else {
            setSettings(prev => ({ ...prev, difficulty: prev.difficulty + 1 as 0 | 1 | 2 | 3 | 4 | 5 }))
        }
    }

    useKeyPressHandler({
        questions,
        currentQuestion,
        setAnswers,
        setCurrentQuestion,
        answers,
        setIsAnimating,
        isAnimating,
        settings,
        setResultData,
        resetTest,
        setIsResult,
        setTracker,
        tracker,
        stopTimer,
    })

    useEffect(() => {
        if (isResult) {
            const serializedTest: TestSubmitType = {
                qpm: calculateQPM(resultData.correct, resultData.time),
                raw: calculateQPM(resultData.quantity, resultData.time),
                number: resultData.quantity,
                accuracy: (resultData.correct / resultData.quantity) * 100,
                time: resultData.time,
                difficulty: resultData.difficulty,
                mode: resultData.mode == 'time' ? "time" : "questions"
            }
            submitTest(serializedTest);
        }
    }, [isResult])

    if (isLoading) return <Loading />;

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
                                    {/* settings bar for pc */}
                                    <div className='gap-3 text-sm text-gray bg-dark w-fit py-3 px-6 rounded-lg mx-auto mt-5 mb-5 hidden lg:flex'>
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

                                    {/* tests settings bar for mobile */}
                                    <div className=" lg:hidden">
                                        <Dialog>
                                            <DialogTrigger className="w-full flex items-center justify-center my-2"><Button className="bg-dark text-gray hover:bg-gray hover:text-dark w-fit"><FaGear />settings</Button></DialogTrigger>
                                            <DialogContent>
                                                <DialogClose
                                                    onClick={e => resetTest()}><Button className="bg-error">Close</Button></DialogClose>
                                                <div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.type.includes("all") ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => changeSettingsType("all")}>all</div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.type.includes("add") ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => changeSettingsType("add")}>add</div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.type.includes("sub") ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => changeSettingsType("sub")}>subtract</div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.type.includes("multiply") ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => changeSettingsType("multiply")}>multiply</div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.type.includes("squares") ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => changeSettingsType("squares")}>square</div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.type.includes("root") ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => changeSettingsType("root")}>root</div>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${!settings.isTime ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => setSettings({ ...settings, isTime: false, number: 10 })}>questions</div>
                                                    <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.isTime ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                        onClick={e => setSettings({ ...settings, isTime: true, number: 30 })}>time</div>
                                                </div>
                                                <Separator />
                                                <div>
                                                    {
                                                        (settings.isTime ? [30, 60, 120, 180] : [5, 10, 15, 25]).map((item, index) => (
                                                            <div className={`w-full text-center my-1 py-1 font-medium rounded-2xl ${settings.number === item ? "bg-primary text-gray" : "text-reverse bg-dark"}`}
                                                                onClick={e => setSettings({ ...settings, number: item })}
                                                                key={index}>{item}</div>
                                                        ))
                                                    }
                                                </div>

                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <div className="text-xl w-fit mx-auto lg:mb-5 flex items-center justify-center gap-1 text-gray font-semibold hover:text-text cursor-pointer"
                                        onClick={handleDifficultyChange}>
                                        <PiGaugeBold /> difficulty: {settings.difficulty == 0 ? "mixed" : settings.difficulty}
                                    </div>
                                </>

                                :
                                <div className="mx-auto w-fit flex items-center justify-center gap-10">
                                    <h1 className="text-primary text-xl lg:text-5xl font-bold">{!settings.isTime ? `${currentQuestion}/${settings.number}` : ""}</h1>
                                    <h1 className="text-primary text-xl lg:text-5xl font-bold">{renderTimer()}</h1>
                                </div>
                        }
                        {/* Numbers and math */}
                        <div className="relative h-[25vh] lg:h-[calc(100vh-400px)] w-full overflow-hidden flex items-center justify-center"
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
                                                <h1 className={`${distance === 0 ? "text-primary text-4xl  md:text-8xl" : "text-gray text-xl md:3xl lg:text-5xl"} font-bold mb-10 text-center `}>
                                                    {question.question}
                                                </h1>
                                                {/* Nested Ternary Operator one to determine is question is right or wrong(inner) and the outter to determine if the question is the current one */}
                                                <div className={`${distance === 0 ? "text-white text-5xl md:text-9xl" : tracker[index] ? "text-primary text-4xl" : "text-error text-4xl"} text-center mb-5 font-bold`}>
                                                    {answers[index]}
                                                </div>
                                                <div className={`h-1 ${distance === 0 ? "bg-primary w-1/3 md:w-2/3" : "bg-gray w1/5 w-1/3"}`}></div>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                        {/* refresh button */}
                        <div className="text-gray text-5xl flex items-center justify-center "
                            style={{ opacity: TextFade ? 0 : 1 }}>
                            <MdOutlineRefresh className="cursor-pointer hover:text-primary"
                                onClick={e => {
                                    resetTest();
                                }} />
                        </div>
                        {/* num pad */}
                        <div>
                            <Drawer>
                                <DrawerTrigger className="fixed bottom-10 lg:bottom-5 right-5"onClick={resetTest}><Button><FaTerminal /></Button></DrawerTrigger>
                                <DrawerContent>
                                    <div className="flex items-center justify-center flex-wrap gap-y-3 gap-x-4">
                                        {
                                            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "="].map((item, index) => (
                                                <Button
                                                    key={index}
                                                    className="size-1/4 text-2xl "
                                                    onClick={() => {
                                                        let key = item;
                                                        let code = `Digit${item}`;
                                                        let keyCode = key.charCodeAt(0);

                                                        if (item === "=") {
                                                            // "=" means space in your UI
                                                            key = " ";
                                                            code = "Space";
                                                            keyCode = 32;
                                                        }

                                                        const event = new KeyboardEvent("keydown", {
                                                            key,
                                                            code,
                                                            keyCode,
                                                            which: keyCode,
                                                            bubbles: true,
                                                        });

                                                        document.body.dispatchEvent(event);
                                                    }}
                                                >
                                                    {item}
                                                </Button>
                                            ))
                                        }
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>
                        {/* Theme */}
                        <div>
                            <Drawer>
                                <DrawerTrigger className="hidden md:absolute bottom-5 left-5"><Button>Change Theme</Button></DrawerTrigger>
                                <DrawerContent>
                                    <div className="w-[80%] mx-auto">
                                        <DrawerHeader>
                                            <DrawerTitle className="text-primary text-4xl">Change Theme</DrawerTitle>
                                            <DrawerDescription className="text-gray">Choose your preferred theme</DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerComponent />
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </>
            }
        </>
    )
}

export default Home;