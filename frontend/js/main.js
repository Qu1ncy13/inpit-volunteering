import { dateBarGenerator, renderEvents } from "./render.js";
import {initEventListeners, initFilterListeners} from "./listeners.js";
import {state} from "./state.js";
import { getEvents } from "./api.js";



async function start() {
    state.events = await getEvents();
    updateMain();
}
function updateMain(){
    dateBarGenerator();
    renderEvents(state.selectedDate);
    initFilterListeners();
}

start();