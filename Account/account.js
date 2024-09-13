function accountInformationDisplay(){
    fetch("account_information.php")
    .then(response => response.json())
    .then(data => {
        document.getElementById("user-name").textContent += data.username;
        document.getElementById("user-role").textContent += data.role;
    })
}

function validatePasswordChange(e){
    e.preventDefault();

    var isValid = true;

    var oldPassword = document.getElementById("old-password").value.trim();
    var newPassword = document.getElementById("new-password").value.trim();
    var newPasswordConfirmation = document.getElementById("new-password-confirmation").value.trim();
    
    var oldPasswordError = document.getElementById("old-password-error");
    var newPasswordError = document.getElementById("new-password-error");
    var newPasswordConfirmationError =document.getElementById("new-password-confirmation-error");

    oldPasswordError.textContent = '';
    newPasswordError.textContent = '';
    newPasswordConfirmationError.textContent = '';

    if(oldPassword == ''){
        oldPasswordError.textContent = "Vui lòng nhập mật khẩu cũ";
        isValid = false;
    } 

    if (newPassword == ''){
        newPasswordError.textContent = "Vui lòng nhập mật khẩu mới";
        isValid = false;
    } 

    if (newPasswordConfirmation == ''){
        newPasswordConfirmationError.textContent = "Vui lòng xác nhận mật khẩu mới";
        isValid = false;
    } else if (newPasswordConfirmation != newPassword){
        newPasswordConfirmationError.textContent = "Mật khẩu không trùng khớp";
        isValid = false;
    } 

    if(!isValid){
        return;
    }
    
    var formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("new_password", newPasswordConfirmation); // gửi 1 trong 2 password hoặc password confirmation là được nhưng để cho chắc thì dùng password confirmation

    fetch("change_password_process.php", {
        method: "POST",
        body: formData
    })
    .then (response => response.json())
    .then (data => {
        alert(data.message);
    })
    
}

function confirmAccountDelete(e){
    e.preventDefault();

    var isValid = true;

    var username = document.getElementById("username-delete").value.trim();
    var password = document.getElementById("password-delete").value.trim();

    var usernameError = document.getElementById("username-delete-error");
    var passwordError = document.getElementById("password-delete-error");

    usernameError.textContent = '';
    passwordError.textContent = '';

    if (username == ''){
        usernameError.textContent = "Vui lòng nhập tên đăng nhập";
        isValid = false;
    }

    if (password == ''){
        passwordError.textContent = "Vui lòng nhập mật khẩu";
        isValid = false;
    }

    if(!isValid){
        return;
    }
    
    var formData = new FormData();
    formData.append("username_delete", username);
    formData.append("password_delete", password);

    fetch("delete_account_process.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message)
        if(data.status == "success"){
            window.location.href ="../Shared/logout.php";
        }
    })
}

accountInformationDisplay();

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

document.getElementById("delete-account-form").addEventListener("submit", confirmAccountDelete);
document.getElementById("change-password-form").addEventListener("submit", validatePasswordChange);



