export default function daysSince(dateStr: string | Date): number {
    const past = new Date(dateStr);
    const now = new Date();

    // نخلّي الوقت 00:00:00 في اليومين عشان نحسب الأيام بس
    past.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
}
