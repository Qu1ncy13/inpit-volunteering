import { addEventModal, editEventModal, deleteEventModal, attendeesModal } from "./adminDom.js";
import { openModal, closeModal } from "./adminModals.js";

export function initAdminListeners(){
    let activeModal = null;
    // добавление мероприятия
    const createEventBtn = document.getElementById("createEventBtn");
    createEventBtn.addEventListener("click", () =>{
        activeModal = addEventModal;
        openModal(activeModal);
        createEvent();
    });
    
    // редактирование мероприятия
    const editEventBtn = document.querySelectorAll(".editEventBtn");
    editEventBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            activeModal = editEventModal;
            openModal(activeModal);
            
        });
    });
    // удаление мероприятия 
    const deleteEventBtn = document.querySelectorAll(".deleteEventBtn");
    deleteEventBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            activeModal = deleteEventModal;
            openModal(activeModal);
        });
    });
    // модалка участников
    const attendeesModalBtn = document.querySelectorAll(".attendeesModalBtn");
    attendeesModalBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            activeModal = attendeesModal;
            openModal(activeModal);
            
        });
    });
    // закрытие модалок
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    cancelBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            if (activeModal){
                closeModal(activeModal);
                activeModal = null
            }
        });
    });
}
function createEvent(){
    const createEventForm = document.getElementById("createEventForm");

    const eventTitleInput = document.getElementById("add-title");
    const eventTypeInput = document.getElementById("add-type");
    const eventTimeInput = document.getElementById("add-time");
    const eventDateInput = document.getElementById("add-date");
    const eventPlaceInput = document.getElementById("add-place");

    createEventForm.addEventListener("submit", async (event) =>{
        event.preventDefault();
        const eventData = {
            title: eventTitleInput.value.trim(),
            date: eventDateInput.value,
            time: eventTimeInput.value,
            place: eventPlaceInput.value.trim(),
            type_id: Number(eventTypeInput.value)
        }
        const responce = await fetch("http://127.0.0.1:3000/events", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(eventData)
        });

        const data = await responce.json();
        console.log(data);
    });

}
