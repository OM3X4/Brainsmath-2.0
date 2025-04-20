'use client'
import { useQuery } from '@tanstack/react-query';
import fetchProfile from '../fetchingFns/FetchUserData';


type Score = {
    id: number;
    qpm: number;
    raw: number;
    accuracy: number;
    mode: "time" | "questions";
    difficulty: number;
    creation: string;
    number: number;
    time: number;
    user: number;
};

type DifficultyScores = {
    1: Score | null;
    2: Score | null;
    3: Score | null;
    4: Score | null;
    5: Score | null;
};

type TimeScores = {
    30: DifficultyScores;
    60: DifficultyScores;
    120: DifficultyScores;
    180: DifficultyScores;
};

type QuestionScores = {
    5: DifficultyScores;
    10: DifficultyScores;
    15: DifficultyScores;
    25: DifficultyScores;
};

type BestScores = {
    time: TimeScores;
    questions: QuestionScores;
};

type Streak = {
    user_streak: number;
    longest_streak: number;
};

type UserData = {
    username: string;
    streak: Streak;
    date_joined: string;
    best_scores: BestScores;
    theme: string;
    font: string;
    tests: Score[];
};




export default function ProfileFetcher() {
    useQuery<UserData>({
        queryKey: ["userData"],
        queryFn: fetchProfile,
        staleTime: 60000 * 60,
        retry: 1
    })

    return null;
}