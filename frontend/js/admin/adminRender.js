import { eventsCount , usersCount, categoryCount} from "./adminDom.js";
import {eventsTable} from "./adminDom.js";
import {categories } from "./adminConstants.js";
import { months } from "../constants.js";
import { initAdminListeners } from "./adminListeners.js";
export function renderAdminStats(){
    
}
export async function renderActiveEvents(){
    const responce = await fetch("http://127.0.0.1:3000/events", {
        method: "GET",
    })
    const data = await responce.json();
    
    data.forEach((event) => {
        const {title, date, time, place, type_id} = event;

        const eventDate = new Date(date);
        const month = months[eventDate.getMonth()];
        const day = eventDate.getDate();
        const category = categories[type_id];
        
        const card = document.createElement('div');
        card.classList.add('admin-row');
        card.innerHTML =`
            <div class="admin-row-date" id="adminRowDate">
                <b>${day}</b>${month}, ${time}
            </div>
                <div class="admin-row-body">
                    <span class="type" id="eventType">${category}</span>
                    <h3 id="eventName">${title}</h3>
                    <p id="eventPlace">${place}</p>
                </div>
                <div class="admin-row-actions">
                    <button class="admin-icon-btn attendeesModalBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </button>
                    <button class="admin-icon-btn editEventBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                        </svg>
                    </button>
                    <button class="admin-icon-btn deleteEventBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/>
                        </svg>
                    </button>
                </div>    
        `
        eventsTable.append(card)
    });
    initAdminListeners();
}
