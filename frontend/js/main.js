const mainPlace = document.querySelector(".main");
const datePlace = document.querySelector(".dates");
const eventsPlace = document.querySelector(".schedule");
const signInModal = document.getElementById("signUpModal");
const successSignInModal = document.getElementById("successSignInModal");
const mainPageDate = document.querySelector(".mainDate");

let selectedDate = new Date();

const weekDays = [
    "ВС",
    "ПН",
    "ВТ",
    "СР",
    "ЧТ",
    "ПТ",
    "СБ"
];
const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];
const fakeEvents = [
    {
        id: 1,
        title: "Посадка деревьев",
        date: "2026-07-18",
        type: "Волонтерство",
        place: "ИНПИТ",
        time: "14:00"
    },
    {
        id: 2,
        title: "Хакатон",
        date: "2026-08-01",
        type: "Наука",
        place: "Ауд. 312",
        time: "12:00"
    }
];

function dateBarGenerator(){
    
    const today = new Date();
    for (let i = 0; i < 30; i++){

        const currentDate = new Date(today);

        currentDate.setDate(today.getDate() + i);
        const button = document.createElement("button");
        button.classList.add("date");
        if (i === 0){
            button.classList.add("active");
            mainPageDate.textContent = `${currentDate.getDate()}` + ` ` + `${months[currentDate.getMonth()]}`;
        }
        button.addEventListener("click", () =>{
            selectedDate = currentDate;
            document.querySelectorAll('.date').forEach(b => b.classList.remove('active'));
            button.classList.add("active");
            mainPageDate.textContent = `${selectedDate.getDate()}` + ` `+ `${months[selectedDate.getMonth()]}`;
            renderEvents(selectedDate);
        }); 
        button.innerHTML = `
            <b>${currentDate.getDate()}</b>
            <span>${weekDays[currentDate.getDay()]}</span>
        `;
        
        datePlace.append(button)
    }
}
function setupMainEvents(){
    const signInToEventBtn = document.querySelectorAll(".add");
    const closeModalBtn = signInModal.querySelector(".closeBtn");
    const submitModalBtn = signInModal.querySelector(".submitBtn");
    const closeSignInModalBtn = successSignInModal.querySelector(".closeSignInModalBtn");
    
    signInToEventBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            signInModal.classList.remove("hidden");
        });
    });
    closeModalBtn.addEventListener("click", () =>{
        signInModal.classList.add("hidden");
    });
    submitModalBtn.addEventListener("click", () =>{
        // ОТПРАВКА ДАННЫХ
        signInModal.classList.add("hidden");
        successSignInModal.classList.remove("hidden");
    });
    closeSignInModalBtn.addEventListener("click", () =>{
        successSignInModal.classList.add("hidden");
    });
}
function renderEvents(date){
    const selectedDateString = formatDate(date);
    eventsPlace.innerHTML = '';
    let flag = false;
    fakeEvents.forEach((event) =>{
        if (event.date === selectedDateString){
            flag = true;
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
                            <button class="add" type="button" aria-label="Добавить мероприятие">Записаться</button>
                        </div>
                    </div>
                
            `;
            eventsPlace.append(eventCard);
            
        }
    });
    if (!flag){
        eventsPlace.innerHTML = `
            <div class="empty-events">
                <h1>В этот день нет мероприятий</h1>
            </div>
        `
    }
    setupMainEvents();
}
function formatDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`
}
function renderEmptyState(){
    mainPlace.innerHTML = `
        <div class="empty-events">
            <h1>В этот день нет мероприятий</h1>
        </div>
    `;
}
function updateMain(){
    dateBarGenerator();
    renderEvents(selectedDate);
    setupMainEvents();
}

updateMain();