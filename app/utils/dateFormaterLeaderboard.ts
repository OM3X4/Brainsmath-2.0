export default function formatDateTime(isoString: any) {
    const dateObj = new Date(isoString);

    // Options for date: "22 Apr 2025"
    const date = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    // Options for time: "02:46"
    const time = dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return { date, time };
}