export const durationTimeFormatter = (durationTime) => {
    const hours = Math.trunc(durationTime / 60);
    const minutes = durationTime % 60;
    return `${hours > 0 ? `${hours}ч ` : ''}${minutes}мин`;
}
