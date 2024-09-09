// hàm check input
function validateFormInput(e, formType){
    var isValid = true;

    // lấy input, bỏ khoảng trắng, formType để phân biệt file login và register
    var username = document.getElementById(formType + "-username").value.trim();
    var password = document.getElementById(formType + "-password").value.trim();
    var passwordConfirmation = document.getElementById(formType + "-password-confirmation")?.value.trim();
    
    // lấy các tag của thẻ thông báo lỗi
    var usernameErrorMessage = document.getElementById("username-error-message");
    var passwordErrorMessage = document.getElementById("password-error-message");

    // xóa lỗi trước đó nếu có
    usernameErrorMessage.textContent = '';
    passwordErrorMessage.textContent = '';

    // nếu ở register thì có thêm 1 slot cho xác nhận mật khẩu
    if (formType === 'register'){
        var passwordConfirmationErrorMessage = document.getElementById("password-confirmation-error-message");
        passwordConfirmationErrorMessage.textContent = '';
    }

    // validate check
    if (username === '') {
        usernameErrorMessage.textContent = 'Tên đăng nhập là bắt buộc';
        isValid = false;
    }

    if (password === '') {
        passwordErrorMessage.textContent = 'Mật khẩu là bắt buộc';
        isValid = false;
    }
    
    if (formType === 'register' && passwordConfirmation === '') {
        passwordConfirmationErrorMessage.textContent = 'Xác nhận mật khẩu là bắt buộc';
        isValid = false;
    } else if (formType === 'register' && passwordConfirmation !== password) {
        passwordConfirmationErrorMessage.textContent = 'Mật khẩu không trùng khớp';
        isValid = false;
    }

    if (!isValid()){
        e.preventDefault(); // ngăn việc gửi dữ liệu ngay khi ấn submit mà đợi check validate của input, ncl ko valid thì ko submit
    }

    // debug
    // if (usernameIsValid && passwordIsValid && passwordConfirmationIsValid) {
    //     alert(formType === 'register' ? "Đăng ký thành công" : "Đăng nhập thành công");
    //     this.submit(); // giải pháp tạm thời vì không biết sử dụng ajax
    // }

    var message;
    if (formType === "register"){
        fetch("register-validate.php")
            .then (response => response.json())
            .then (data => {
                message = data.message;
            })
    } else {
        fetch("login-validate.php")
            .then (response => response.json())
            .then (data => {
                message = data.message;
            })
    }
    alert(message);
}

// hiển thị mật khẩu khi ấn vào icon lock
function togglePassword(inputId){
    var passwordInput = document.getElementById(inputId);
    var icon = passwordInput.parentElement.querySelector('i');
    if (passwordInput.type === "password"){
        passwordInput.type = "text"; // đổi type thành text để hiển thị được mật khẩu
        icon.classList.replace("bx-lock-alt", "bx-lock-open-alt"); // đổi icon thành khóa mở
        
    } else {
        passwordInput.type = "password";
        icon.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
}