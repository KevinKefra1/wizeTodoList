export function formatDate(date: Date): string {
    const month = date.toLocaleDateString("en-US", { month: "long" }); // Use built-in formatting
    const day = date.getDate();
    const year = date.getFullYear();

    return `Schedule for ${month} ${day}, ${year}`;
}