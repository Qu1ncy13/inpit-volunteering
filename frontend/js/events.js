import {openSignUpModal} from "./modal.js";
import { signInModal } from "./dom.js";

export function initEventListeners(){
    const signInToEventBtn = document.querySelectorAll(".add");
    const cancelModalBtn = signInModal.querySelector(".cancelBtn");
    const submitModalBtn = signInModal.querySelector(".submitBtn");
    const closeSignInModalBtn = successSignInModal.querySelector(".closeSignInModalBtn");
    
    signInToEventBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            const eventId = Number(button.dataset.id);
            openSignUpModal(eventId);
        });
    });
    cancelModalBtn.addEventListener("click", () =>{
        signInModal.classList.add("hidden");
    });
    signInModal.addEventListener("click", (e) =>{
        if (e.target === signInModal){
            signInModal.classList.add("hidden");
        }
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
