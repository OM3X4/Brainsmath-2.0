import { Question, QuestionType } from "../types/types";

export function generateRandomQuestions(types: QuestionType[] = ['all'], numQuestions: number = 10, difficulty: number): Question[] {
    const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    let difficulties = [
        { // Level 1 – Warmup
            addMin: 1,
            addMax: 100,
            subMin: 1,
            subMax: 100,
            mulMin: 1,
            mulMax: 10,
            rootMin: 1,
            rootMax: 10,      // √1–100
            squareMin: 1,
            squareMax: 10,    // 1²–10²
        },
        { // Level 2 – Getting Real
            addMin: 50,
            addMax: 500,
            subMin: 50,
            subMax: 500,
            mulMin: 5,
            mulMax: 30,
            rootMin: 10,
            rootMax: 30,      // √100–900
            squareMin: 10,
            squareMax: 30,    // 10²–30²
        },
        { // Level 3 – Challenge Zone
            addMin: 200,
            addMax: 1000,
            subMin: 200,
            subMax: 1000,
            mulMin: 10,
            mulMax: 80,
            rootMin: 20,
            rootMax: 50,      // √400–2500
            squareMin: 20,
            squareMax: 50,    // 20²–50²
        },
        { // Level 4 – Mental Gym
            addMin: 500,
            addMax: 5000,
            subMin: 500,
            subMax: 5000,
            mulMin: 25,
            mulMax: 99,
            rootMin: 30,
            rootMax: 70,      // √900–4900
            squareMin: 30,
            squareMax: 70,    // 30²–70²
        },
        { // Level 5 – Brain Meltdown 😈
            addMin: 1000,
            addMax: 10000,
            subMin: 1000,
            subMax: 10000,
            mulMin: 50,
            mulMax: 999,      // up to 3-digit × 3-digit
            rootMin: 50,
            rootMax: 100,     // √2500–10000
            squareMin: 50,
            squareMax: 100,   // 50²–100²
        }
    ]

    if (difficulty === 0) {
        difficulties = [{
            addMin: 0,
            addMax: difficulties[4].addMax,
            subMin: 0,
            subMax: difficulties[4].subMax,
            mulMin: 0,
            mulMax: difficulties[4].mulMax,
            rootMin: 0,
            rootMax: difficulties[4].rootMax,
            squareMin: 0,
            squareMax: difficulties[4].squareMax,
        }];

         difficulty = 1;
    }

    



    const generateAddQuestion = (): Question => {
        const a = getRandomInt(difficulties[difficulty - 1].addMin, difficulties[difficulty - 1].addMax);
        const b = getRandomInt(difficulties[difficulty - 1].addMin, difficulties[difficulty - 1].addMax);
        return {
            type: 'add',
            question: `${a} + ${b}`,
            answer: `${a + b}`,
        };
    };

    const generateSubQuestion = (): Question => {
        const a = getRandomInt(difficulties[difficulty - 1].subMin, difficulties[difficulty - 1].subMax);
        const b = getRandomInt(difficulties[difficulty - 1].subMin, a);
        return {
            type: 'sub',
            question: `${a} - ${b}`,
            answer: `${a - b}`,
        };
    };

    const generateMulQuestion = (): Question => {
        const a = getRandomInt(difficulties[difficulty - 1].mulMin, difficulties[difficulty - 1].mulMax);
        const b = getRandomInt(difficulties[difficulty - 1].mulMin, difficulties[difficulty - 1].mulMax);
        return {
            type: 'multiply',
            question: `${a} * ${b}`,
            answer: `${a * b}`,
        };
    };

    const generateRootQuestion = (): Question => {
        const a = getRandomInt(difficulties[difficulty - 1].rootMin, difficulties[difficulty - 1].rootMax);
        const perfectSquare = a * a;
        return {
            type: 'root',
            question: `√${perfectSquare}`,
            answer: `${a}`,
        };
    };

    const generateSquareQuestion = (): Question => {
        const a = getRandomInt(difficulties[difficulty - 1].squareMin, difficulties[difficulty - 1].squareMax);
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
