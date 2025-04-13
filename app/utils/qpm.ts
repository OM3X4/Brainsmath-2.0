export default function calculateQPM(questions: number, timeInMs: number) : number {
    const timeInMinutes = timeInMs / 60000;
    const qpm = questions / timeInMinutes;
    return qpm;
}