import { fakeEvents } from "./api.js";
import { months, weekDays } from "./constants.js";
import { mainPageDate, datePlace, eventsPlace } from "./dom.js";
import { initEventListeners } from "./events.js";
import { formatDate, sortEventsByTime } from "./format.js";
import { state } from "./state.js";

export function renderEvents(date){
    const selectedDateString = formatDate(date);
    const dayEvents = fakeEvents.filter((event) => selectedDateString === event.date);


    const activeFilters = document.querySelectorAll(".chip.active");
    let activeTypes = [];
    activeFilters.forEach((button) =>{
        activeTypes.push(Number(button.dataset.type));
    });
    let filteredEvents = [];
    if (activeTypes.length === 0){
        filteredEvents = dayEvents;
    }
    else{
        filteredEvents = dayEvents.filter((event) => activeTypes.includes(event.typeId));
    }
    

    sortEventsByTime(filteredEvents);
    
    eventsPlace.innerHTML = '';
    
    if (filteredEvents.length === 0){
        eventsPlace.innerHTML = `
            <div class="empty-events">
                <h2>В этот день нет мероприятий</h2>
                <p>Мероприятия на эту дату не запланированны или ещё не добавлены</p>
            </div>
        `
    }
    filteredEvents.forEach((event) =>{
        const eventCard = document.createElement("div");
        eventCard.className = "event";
        eventCard.innerHTML = `
                <div class="time">${event.time}</div>
                    <div class="card">
                        <div class="card-info-block">
                            <h3>${event.title}</h3>
                            <span class="type">${event.type}</span>
                            <p>${event.place}</p>
                        </div>
                    <div class="card-btn-block">
                        <button class="add" type="button" aria-label="Добавить мероприятие" data-id="${event.id}">Записаться</button>
                    </div>
                </div>
                
        `;
        eventsPlace.append(eventCard);
    });
    initEventListeners();
}
export function dateBarGenerator(){
    
    const today = new Date();
    for (let i = 0; i < 30; i++){

        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const currentDateString = formatDate(currentDate);
        const hasEvents = fakeEvents.some((event) =>{
            return event.date === currentDateString;
        });
        const button = document.createElement("button");
        button.classList.add("date");
        if (hasEvents){
            button.classList.add("has-events");
        }
        if (i === 0){
            button.classList.add("active");
            mainPageDate.textContent = `${currentDate.getDate()}` + ` ` + `${months[currentDate.getMonth()]}`;
        }
        button.addEventListener("click", () =>{
            state.selectedDate = currentDate;
            document.querySelectorAll('.date').forEach(b => b.classList.remove('active'));
            button.classList.add("active");
            mainPageDate.textContent = `${state.selectedDate.getDate()}` + ` `+ `${months[state.selectedDate.getMonth()]}`;
            renderEvents(state.selectedDate);
        }); 
        button.innerHTML = `
            <b>${currentDate.getDate()}</b>
            <span>${weekDays[currentDate.getDay()]}</span>
        `;
        
        datePlace.append(button)
    }
}

