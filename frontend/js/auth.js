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
        const responce = await fetch("http://127.0.0.1:3000/register", {
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
        
        const responce = await fetch("http://127.0.0.1:3000/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLoginData)
        });
        
        const data = await responce.json();

        if (data.user.role === "admin"){
            window.location.href = "./admin.html";
        } else {
            window.location.href = "./index.html";
        }

    });

}
export async function checkAuth() {
    const responce = await fetch("http://127.0.0.1:3000/me", {
        method: "GET",
        credentials: "include"
    });
    if (responce.status === 401){
        window.location.href = "./login.html";
        return false;
    }
    const data = await responce.json();
    console.log("Пользователь:", data.user);
    return true;
    
}
if (document.getElementById("form-login")){
    login();
}
if (document.getElementById("form-register")){
    registration();
}
