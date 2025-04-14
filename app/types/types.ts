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
    difficulty: number
}

export interface ResultData {
    quantity: number;
    time: number; // ms
    type: QuestionType[];
    correct: number;
    difficulty: number;
    mode: "Time" | "Questions";
}

