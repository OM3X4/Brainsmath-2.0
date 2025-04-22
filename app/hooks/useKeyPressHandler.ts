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

            // Update tracker for current question
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
                // For the last question, we need to make sure the tracker update is taken into account
                setTimeout(() => {
                    if (!settings.isTime) {
                        setResultData((prev: any) => {
                            // Calculate correct answers including the current one
                            let correctCount = 0;
                            for (let i = 0; i < questions.length; i++) {
                                if (i === currentQuestion) {
                                    // For the current question, use the direct comparison
                                    if (isCorrect) correctCount++;
                                } else if (tracker[i]) {
                                    // For previous questions, use the tracker
                                    correctCount++;
                                }
                            }

                            return {
                                ...prev,
                                type: settings.type,
                                difficulty: settings.difficulty,
                                time: stopTimer.totalSeconds * 1000,
                                quantity: questions.length,
                                correct: correctCount,
                                mode: "questions"
                            };
                        });
                    }
                    resetTest();
                    setIsResult(true);
                }, 100); // Short delay to ensure UI updates properly
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            resetTest();
        } else if (!["Control", "Alt", "Shift"].includes(e.key)) {
            playRandomSound("wrong");
        }
    }, [currentQuestion, answers, isAnimating, questions, tracker, settings]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);
}