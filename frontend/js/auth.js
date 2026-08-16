function registration(){
    const registerForm = document.getElementById("form-register");

    const userNameInput = document.getElementById("reg-fullname");
    const userEmailInput = document.getElementById("reg-email");
    const userPasswordInput = document.getElementById("reg-password");
    const userStudyGroupInput = document.getElementById("reg-group");


    registerForm.addEventListener("submit", async (event) =>{
        event.preventDefault();
        const userData = {
            name: userNameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value,
            study_group: userStudyGroupInput.value
        };
        const responce = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        const testResponse = await responce.json();
        console.log(testResponse);

    });
}
registration();