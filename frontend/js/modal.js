import {formatDateHuman} from "./format.js";
import { fakeEvents } from "./api.js";
import { signInModal } from "./dom.js";

export function openSignUpModal(eventId){
    const event = fakeEvents.find(e => e.id === eventId);
    if (event){
        const typeEl = document.getElementById("modalEventType");
        const titleEl = document.getElementById("modalEventTitle");
        const metaEl = document.getElementById("modalEventMeta");
        if (typeEl) typeEl.textContent = event.type;
        if (titleEl) titleEl.textContent = event.title;
        if (metaEl) metaEl.textContent = `${formatDateHuman(event.date)} · ${event.time} · ${event.place}`;
    }
    signInModal.classList.remove("hidden");
}