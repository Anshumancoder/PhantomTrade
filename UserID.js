const usernameInput = document.getElementById("usernameInput");
const saveButton = document.getElementById("saveButton");

let registeredUsers = JSON.parse(localStorage.getItem("phantomTraderUsers")) || [];
export let activeUser = localStorage.getItem("phantomTradeActiveUser");

window.addEventListener("DOMContentLoaded", () => {
    if (usernameInput && activeUser) {
        usernameInput.value = activeUser;
    }
});

if (saveButton) {
    saveButton.addEventListener("click", () => {
        const enteredUsername = usernameInput.value.trim();
        if (!enteredUsername) return;
        
        const userExists = registeredUsers.includes(enteredUsername);

        if (!userExists) {
            registeredUsers.push(enteredUsername);
            localStorage.setItem("phantomTraderUsers", JSON.stringify(registeredUsers));
            alert(`U created a new username "${enteredUsername}" which was saved`);
        } else {
            alert(`Welcome back, ${enteredUsername}`);
        }

        localStorage.setItem("phantomTradeActiveUser", enteredUsername);
        window.location.href = "mainPage.html";
    });
}