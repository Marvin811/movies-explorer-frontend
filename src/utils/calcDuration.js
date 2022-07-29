export const calcDuration = (min) => {
    const hour = Math.floor(min / 60);
    const minute = Math.floor(min % 60);
    return `${hour === 0 ? "" : `${hour}час`} ${minute}мин`;
}
