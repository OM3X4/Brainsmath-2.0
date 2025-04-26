'use client';
import React from 'react';
import { MdOutlineRefresh } from "react-icons/md";
import calculateQPM from '@/app/utils/qpm';
import { PiGaugeBold } from "react-icons/pi";
import { ResultData, BarSettingsType } from '@/app/types/types';

type ResultProps = {
    resultData: ResultData;
    TextFade: boolean;
    settings: BarSettingsType;
    resetTest: () => void;
};

function Result({ resultData, TextFade, settings, resetTest }: ResultProps) {
    return (
        <div
            className="h-[calc(100vh-300px)] w-full overflow-hidden flex items-center justify-center flex-col"
            style={{ opacity: TextFade ? 0 : 1 }}
        >
            <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-x-20 gap-y-5">
                <div className="flex flex-col items-center">
                    <p className="text-gray text-xl lg:text-3xl">Speed <span className="text-[8px]">(QPM × 3)</span></p>
                    <h1 className="text-primary text-5xl lg:text-7xl font-bold">{(calculateQPM(resultData.correct, resultData.time) * 3).toFixed(0)}</h1>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-gray text-xl lg:text-3xl">Acc</p>
                    <h1 className="text-primary text-5xl lg:text-7xl font-bold">{((resultData.correct / resultData.quantity) * 100).toFixed(0)}%</h1>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-gray text-2xl lg:text-3xl">Raw</p>
                    <h1 className="text-primary text-2xl lg:text-4xl font-bold">{(calculateQPM(resultData.quantity, resultData.time) * 3).toFixed(0)}</h1>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-gray text-xl lg:text-2xl">Test Type</h3>
                    <h6 className="text-primary font-semibold text-lg lg:text-xl">{resultData.type.join(", ")}</h6>
                    <h6 className="text-primary font-semibold text-lg lg:text-xl">
                        {settings.isTime ? resultData.time / 1000 : resultData.quantity} {resultData.mode}
                    </h6>
                    <h6 className="text-primary font-semibold text-lg lg:text-xl flex items-center gap-2">
                        <PiGaugeBold /> {resultData.difficulty}
                    </h6>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-gray text-xl lg:text-2xl">Time</h3>
                    <span className="text-primary text-4xl lg:text-5xl font-bold">{(resultData.time / 1000).toFixed(0)}s</span>
                </div>
            </div>

            <div className="text-white text-5xl absolute bottom-20 left-1/2 -translate-x-1/2">
                <MdOutlineRefresh
                    className="cursor-pointer hover:text-primary"
                    onClick={resetTest}
                />
            </div>
        </div>
    );
}

export default Result;
