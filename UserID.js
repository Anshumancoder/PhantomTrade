const usernameInput = document.getElementById("usernameInput")
const saveButton = document.getElementById("saveButton")

let registeredUsers = JSON.parse(localStorage.getItem("phantomTraderUsers")) || []
export let activeUser = localStorage.getItem("phantomTradeActiveUser")

window.addEventListener("DOMContenetLoaded", () => {
    if(activeUser) {
        usernameInput.value = activeUser
    }
})

saveButton.addEventListener("click", () => {
    const enteredUsername = usernameInput.value.trim()
    const userExists = registeredUsers.includes(enteredUsername)


    if (!userExists) {
        registeredUsers.push(enteredUsername)
        localStorage.setItem("phantomTradeUsers", JSON.stringify(registeredUsers))
        alert(`U created a new username "${enteredUsername}" which was saved `)
    } else {
        alert(`Welcome back, ${enteredUsername}`)
    }

    localStorage.setItem("phantomTradeActiveUser", enteredUsername)
    window.location.href = "mainPage.html"
});

