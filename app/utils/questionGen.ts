import { Question, QuestionType } from "../types/types";

export function generateRandomQuestions(types: QuestionType[] = ['all'], numQuestions: number = 10): Question[] {
    const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateAddQuestion = (): Question => {
        const a = getRandomInt(1, 100);
        const b = getRandomInt(1, 100);
        return {
            type: 'add',
            question: `${a} + ${b}`,
            answer: `${a + b}`,
        };
    };

    const generateSubQuestion = (): Question => {
        const a = getRandomInt(1, 100);
        const b = getRandomInt(1, a);
        return {
            type: 'sub',
            question: `${a} - ${b}`,
            answer: `${a - b}`,
        };
    };

    const generateMulQuestion = (): Question => {
        const a = getRandomInt(1, 10);
        const b = getRandomInt(1, 10);
        return {
            type: 'multiply',
            question: `${a} * ${b}`,
            answer: `${a * b}`,
        };
    };

    const generateRootQuestion = (): Question => {
        const a = getRandomInt(1, 10);
        const perfectSquare = a * a;
        return {
            type: 'root',
            question: `√${perfectSquare}`,
            answer: `${a}`,
        };
    };

    const generateSquareQuestion = (): Question => {
        const a = getRandomInt(1, 10);
        return {
            type: 'squares',
            question: `${a}²`,
            answer: `${a * a}`,
        };
    };

    const generators: { [key in QuestionType]: () => Question } = {
        add: generateAddQuestion,
        sub: generateSubQuestion,
        multiply: generateMulQuestion,
        root: generateRootQuestion,
        squares: generateSquareQuestion,
        all: () => {
            const allTypes: QuestionType[] = ['add', 'sub', 'multiply', 'root', 'squares'];
            const randomType = allTypes[getRandomInt(0, allTypes.length - 1)];
            return generators[randomType]();
        }
    };

    const questions: Question[] = [];

    for (let i = 0; i < numQuestions; i++) {
        const selectedType = types[getRandomInt(0, types.length - 1)];
        const question = generators[selectedType]();
        questions.push(question);
    }

    return questions;
}

export default generateRandomQuestions;
