'use client'
import { CgMathMinus } from "react-icons/cg";
import { PiGaugeBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { BiMath } from "react-icons/bi";
import { CgMathPlus } from "react-icons/cg";
import { FaSquareRootAlt } from "react-icons/fa";
import { TbCircleNumber2 } from "react-icons/tb";
import { AiFillClockCircle } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";
import React from 'react'
import { BarSettingsType } from '../types/types'
import {QuestionType} from '../types/types'

interface SettingsBarProps {
    settings: BarSettingsType,
    setSettings: React.Dispatch<React.SetStateAction<BarSettingsType>>;
}



function SettingsBar({ settings, setSettings }: SettingsBarProps) {

    const handleDifficultyChange = (): void => {
        if (settings.difficulty == 5) {
            setSettings(prev => ({ ...prev, difficulty: 0 }))
        } else {
            setSettings(prev => ({ ...prev, difficulty: prev.difficulty + 1 }))
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

    return (
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
            <div className="text-xl w-fit mx-auto mb-10 flex items-center justify-center gap-1 text-gray font-semibold hover:text-text cursor-pointer"
                onClick={handleDifficultyChange}>
                <PiGaugeBold /> difficulty: {settings.difficulty == 0 ? "mixed"  : settings.difficulty}
            </div>
        </>
    )
}

export default SettingsBar;