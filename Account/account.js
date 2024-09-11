document.getElementById("password-change-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".change-password-container").style.display = "block";
});

document.getElementById("delete-account-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".delete-account-container").style.display = "block";
});

document.querySelector(".change-password-container .cancel-button").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".change-password-container").style.display = "none";
});

document.querySelector(".delete-account-container .cancel-button").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".delete-account-container").style.display = "none";
});
