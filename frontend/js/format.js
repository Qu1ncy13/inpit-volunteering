import { months } from "./constants.js";
import { weekDays } from "./constants.js";
export function formatDateHuman(dateString){
    const [year, month, day] = dateString.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${weekDays[dateObj.getDay()]}`;
}

export function formatDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`
}

export function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export function sortEventsByTime(eventsArray){
    eventsArray.sort((a, b) =>{
        return timeToMinutes(a.time) - timeToMinutes(b.time);
    });
}


