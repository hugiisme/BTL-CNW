function validateRegisterForm(e){
    e.preventDefault();

    var isValid = true;
    var username = document.getElementById("register-username").value.trim();
    var name = document.getElementById("register-name").value.trim();
    var email = document.getElementById("register-email").value.trim();
    var password = document.getElementById("register-password").value.trim();
    var passwordConfirmation = document.getElementById("register-password-confirmation").value.trim();

    var usernameError = document.getElementById("username-error");
    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var passwordError = document.getElementById("password-error");
    var passwordConfirmationError = document.getElementById("password-confirmation-error");

    // làm mới error message
    usernameError.textContent = '';
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    passwordConfirmationError.textContent = '';

    if(username == ''){
        usernameError.textContent = "Tên đăng nhập là bắt buộc";
        isValid = false;
    } 
    if(name == ''){
        nameError.textContent = "Tên người dùng là bắt buộc";
        isValid = false;
    }
    if(email == ''){
        emailError.textContent = "Email là bắt buộc";
        isValid = false;
    }
    if(password == ''){
        passwordError.textContent = "Mật khẩu là bắt buộc";
        isValid = false;
    }
    if(passwordConfirmation == ''){
        passwordConfirmationError.textContent = "Vui lòng xác nhận mật khẩu";
        isValid = false;
    } else if(password != passwordConfirmation){
        passwordConfirmationError.textContent = "Mật khẩu không trùng khớp";
        isValid = false;
    }

    if (!isValid){
        return;
    }

    var formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);
    fetch("register_process.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.status == "success"){
                window.location.href = "../login/login.php";
            }
        })
}

document.querySelector(".register-form").addEventListener("submit", validateRegisterForm);