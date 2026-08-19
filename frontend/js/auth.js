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

function login(){
    const loginForm = document.getElementById("form-login");

    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");

    loginForm.addEventListener("submit", async (event) =>{
        event.preventDefault();
        
        const userLoginData = {
            email: loginEmail.value,
            password: loginPassword.value
        }
        console.log('1');
        const responce = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLoginData)
        });
        console.log("2");
        const testResponce = await responce.json();
        console.log(testResponce);

    });
}
login();
registration();