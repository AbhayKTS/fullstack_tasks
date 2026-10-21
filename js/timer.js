const sec = 60;
let rem = sec;
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
console.log("Timer started for 1 minute");
const intervalId = setInterval(() => {
    rem--;
    if (rem < 0) {
        clearInterval(intervalId);
        console.log("Time is up!");
        return;
    }
    console.log(formatTime(rem));
}, 1000);
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Timer finished.");
}, sec * 1000);