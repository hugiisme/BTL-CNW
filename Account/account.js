userDataDisplay();

// đổi tên người dùng
document.getElementById("change-user-name-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".change-name.section").style.display = "block";
})

document.querySelector(".change-name .choices .cancel-btn").addEventListener("click", () => {
    document.querySelector(".change-name.section").style.display = "none";
})

document.querySelector(".change-name .choices .submit-btn").addEventListener("click", changeNameValidation)

// đổi email
document.getElementById("change-email-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".change-email.section").style.display = "block";
})

document.querySelector(".change-email .choices .cancel-btn").addEventListener("click", () => {
    document.querySelector(".change-email.section").style.display = "none";
})

document.querySelector(".change-email .choices .submit-btn").addEventListener("click", changeEmailValidation)

// đổi mật khẩu
document.getElementById("change-password-link").addEventListener("click", (event)=>{
    event.preventDefault();
    document.querySelector(".change-password.section").style.display = "block";
})

document.querySelector(".change-password .choices .cancel-btn").addEventListener("click", () => {
    document.querySelector(".change-password.section").style.display = "none";
})

document.querySelector(".change-password .choices .submit-btn").addEventListener("click", changePasswordValidation)

// xóa tài khoản
document.getElementById("delete-account-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".delete-account.section").style.display = "block";
})

document.querySelector(".delete-account .choices .cancel-btn").addEventListener("click", () => {
    document.querySelector(".delete-account.section").style.display = "none";
})

document.querySelector(".delete-account .choices .submit-btn").addEventListener("click", deleteAccountValidation)

function userDataDisplay(){
    fetch("../shared/user_data.php")
        .then(response => response.json())
        .then(data => {
            document.querySelector(".user-name.detail").textContent = "Tên người dùng: " + data.name;
            document.querySelector(".user-email.detail").textContent = "Email: " + data.email;
            document.querySelector(".user-role.detail").textContent = "Vai trò: " + data.role;
        })
}

function changeNameValidation(e){
    e.preventDefault();

    var isValid = true;
    var newName = document.getElementById("new-name").value.trim();
    var newNameError = document.querySelector(".change-name .error-message");
    newNameError.textContent = '';

    if(newName == ''){
        newNameError.textContent = "Tên mới không được để trống";
        isValid = false;
    }

    if(!isValid){
        return;
    }

    var formData = new FormData();
    formData.append("newName", newName);

    fetch("change_name_process.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if(data.status == "error"){
                newNameError.textContent = data.message;
                return;
            }
            alert(data.message);
            userDataDisplay();
        })
}

function changeEmailValidation(e){
    e.preventDefault();

    var isValid = true;
    var newEmail = document.getElementById("new-email").value.trim();
    var newEmailError = document.querySelector(".change-email .error-message");
    newEmailError.textContent = '';

    if(newEmail == ''){
        newEmailError.textContent = "Email mới không được để trống";
        isValid = false;
    }

    if(!isValid){
        return;
    }

    var formData = new FormData();
    formData.append("newEmail", newEmail);

    fetch("change_email_process.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if(data.status == "error"){
                newEmailError.textContent = data.message;
                return;
            }
            alert(data.message);
            userDataDisplay();
        })
}

function changePasswordValidation(e){
    e.preventDefault();
    
    var isValid = true;
    var oldPassword = document.getElementById("old-password").value.trim();
    var newPassword = document.getElementById("new-password").value.trim();
    var newPasswordConfirmation = document.getElementById("new-password-confirmation").value.trim();

    var oldPasswordError = document.getElementById("old-password-error");
    var newPasswordError = document.getElementById("new-password-error");
    var newPasswordConfirmationError = document.getElementById("new-password-confirmation-error");

    oldPasswordError.textContent = '';
    newPasswordError.textContent = '';
    newPasswordConfirmationError.textContent = '';

    if(oldPassword == ''){
        oldPasswordError.textContent = "Mật khẩu cũ là bắt buộc";
        isValid = false;
    }

    if(newPassword == ''){
        newPasswordError.textContent = "Mật khẩu mới là bắt buộc"
        isValid = false;
    }

    if(newPasswordConfirmation == ''){
        newPasswordConfirmationError.textContent = "Vui lòng xác nhận mật khẩu mới";
        isValid = false;
    } else if (newPasswordConfirmation != newPassword) {
        newPasswordConfirmationError.textContent = "Mật khẩu không trùng khớp";
        isValid = false;
    }

    if (!isValid){
        return;
    }

    var formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPasswordConfirmation);
    fetch("change_password_process.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if(data.status == "error" && data.assigned_id != ''){
                document.getElementById(data.assigned_id).textContent = data.message;
                return;
            }
            alert(data.message);
        })
}

function deleteAccountValidation(e){
    e.preventDefault();

    var isValid = true;
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();

    var usernameError = document.getElementById("username-error");
    var passwordError = document.getElementById("password-error");

    usernameError.textContent = '';
    passwordError.textContent = '';

    if(username == ''){
        usernameError.textContent = "Tên đăng nhập không thể để trống";
        isValid = false;
    }

    if(password == ''){
        passwordError.textContent = "Mật khẩu không thể để trống";
        isValid = false;
    }

    if(!isValid){
        return;
    }

    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch("delete_account_process.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if(data.status == "error" && data.assigned_id != ''){
                document.getElementById(data.assigned_id).textContent = data.message;
                return;
            }
            alert(data.message);
            window.location.href = "../shared/logout.php";
        })
}