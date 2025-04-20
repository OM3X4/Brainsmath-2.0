export interface passwordShowType {
    signup: boolean,
    signupver: boolean,
    login: boolean
}

export interface loginType {
    username: string,
    password: string
}

export interface signupType {
    username: string,
    email: string,
    password: string,
    passwordver: string
}

export type QuestionType = 'all' | 'add' | 'sub' | 'multiply' | 'root' | 'squares';

export interface Question {
    type: QuestionType;
    question: string;
    answer: string;
}

export interface BarSettingsType {
    type: QuestionType[],
    number: number,
    isTime: boolean,
    difficulty: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface ResultData {
    quantity: number;
    time: number; // ms
    type: QuestionType[];
    correct: number;
    difficulty: 0 | 1 | 2 | 3 | 4 | 5;
    mode: "time" | "questions";
}

export interface TestSubmitType {
    "qpm": number;
    "raw": number;
    "number": number;
    "accuracy": number;
    "time": number; // in ms
    "difficulty": 0 | 1 | 2 | 3 | 4 | 5;
    "mode": "time" | "questions";
}

