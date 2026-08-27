import { dateBarGenerator, renderEvents } from "./render.js";
import {initEventListeners, initFilterListeners} from "./listeners.js";
import {state} from "./state.js";
import { getEvents } from "./api.js";
import { checkAuth } from "./auth.js";


async function start() {
    const isAuthorized = await checkAuth();
    if (!isAuthorized){
        return;
    }
    state.events = await getEvents();
    updateMain();
}
function updateMain(){
    dateBarGenerator();
    renderEvents(state.selectedDate);
    initFilterListeners();
}

start();