'use client'
import React , { useEffect , useState } from 'react'
import { MdOutlineRefresh } from "react-icons/md";
import calculateQPM from '@/app/utils/qpm';
import { PiGaugeBold } from "react-icons/pi";
import { ResultData , BarSettingsType , TestSubmitType } from '@/app/types/types';
import { useSubmitTest } from '@/app/hooks/useSubmitTest';






type ResultProps = {
    resultData: ResultData;
    TextFade: boolean;
    settings: BarSettingsType;
    resetTest: () => void;
}

function Result({ resultData , TextFade , settings , resetTest} : ResultProps) {


    const { mutate: submitTest , isSuccess } = useSubmitTest();

    useEffect(() => {
        let hasSubmitted = false;
        if(hasSubmitted) return;


        const serializedTest: TestSubmitType = {
            qpm: calculateQPM(resultData.correct, resultData.time),
            raw: calculateQPM(resultData.quantity, resultData.time),
            number: resultData.quantity,
            accuracy: (resultData.correct / resultData.quantity) * 100,
            time: resultData.time,
            difficulty: resultData.difficulty,
            mode: resultData.mode == 'time' ? "time" : "questions"
        }
        console.log(JSON.stringify(serializedTest))
        hasSubmitted = true
        submitTest(serializedTest);
    }, [])



    return (
        <div className=" h-[calc(100vh-300px)] w-full overflow-hidden flex items-center justify-center flex-col"
            style={{ opacity: TextFade ? 0 : 1 }}>
            <div className="flex flex-wrap items-end  gap-20">
                <div className="">
                    <p className="text-gray text-3xl">speed <span className="text-[8px]">(QPM × 3)</span></p>
                    <h1 className="text-primary text-7xl font-bold">{(calculateQPM(resultData.correct, resultData.time) * 3).toFixed(0)}</h1>
                </div>
                <div className="">
                    <p className="text-gray text-3xl">acc</p>
                    <h1 className="text-primary text-7xl font-bold">{((resultData.correct / resultData.quantity) * 100).toFixed(0)}%</h1>
                </div>
                <div className="">
                    <p className="text-gray text-3xl">raw</p>
                    <h1 className="text-primary text-xl font-bold">{(calculateQPM(resultData.quantity, resultData.time) * 3).toFixed(0)}</h1>
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
    )
}

export default Result