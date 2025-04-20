export function formatDate(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}