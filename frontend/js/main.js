import { dateBarGenerator, renderEvents } from "./render.js";
import {initEventListeners} from "./events.js";
import {state} from "./state.js";
function updateMain(){
    dateBarGenerator();
    renderEvents(state.selectedDate);
    initEventListeners();
}

updateMain();