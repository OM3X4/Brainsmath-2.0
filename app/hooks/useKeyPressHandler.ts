// hooks/useKeyPressHandler.ts
import { useCallback, useEffect } from "react";
import { Question } from "../types/types";
import { playRandomSound } from "../utils/useSoundPlayer";

export default function useKeyPressHandler({
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
}: any) {
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if ("0123456789".includes(e.key)) {
            playRandomSound("click");
            setAnswers((prev: string[]) => {
                const updated = [...prev];
                updated[currentQuestion] += e.key;
                return updated;
            });
        } else if (e.key === "Backspace") {
            setAnswers((prev: string[]) => {
                const updated = [...prev];
                updated[currentQuestion] = updated[currentQuestion].slice(0, -1);
                return updated;
            });
        } else if (e.key === " ") {
            if (isAnimating || !answers[currentQuestion]) return;

            const isCorrect = answers[currentQuestion] === questions[currentQuestion].answer;
            playRandomSound(isCorrect ? "correct" : "wrong");

            setTracker((prev: boolean[]) => {
                const updated = [...prev];
                updated[currentQuestion] = isCorrect;
                return updated;
            });

            if (currentQuestion < questions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestion((prev: number) => prev + 1);
                    setTimeout(() => setIsAnimating(false), 300);
                }, 50);
            } else {
                if (!settings.isTime) {
                    setResultData({
                        ...settings,
                        time: stopTimer.totalSeconds * 1000,
                        quantity: questions.length,
                        correct: tracker.filter((t: boolean) => t).length,
                        mode: "Questions"
                    });
                }
                resetTest();
                setIsResult(true);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            resetTest();
        } else if (!["Control", "Alt", "Shift"].includes(e.key)) {
            playRandomSound("wrong");
        }
    }, [currentQuestion, answers, isAnimating]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);
}
