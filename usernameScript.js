const usernameInput = document.getElementById("usernameInput")
const saveButton = document.getElementById("saveButton")

if (saveButton) {
    saveButton.addEventListener("click", () => {
        const username = usernameInput.value.trim()

        localStorage.setItem("loggedUser", username)
        window.location.href("index.html")
    })
}