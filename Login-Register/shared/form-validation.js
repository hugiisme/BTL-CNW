// hàm check input
function validateFormInput(e, formType){
    e.preventDefault();
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

    if (!isValid){
        e.preventDefault(); // ngăn việc gửi dữ liệu ngay khi ấn submit mà đợi check validate của input, ncl ko valid thì ko submit
    } else {
        // GPT code, ko hiểu hết TT-TT
        var url = formType === 'register' ? "../register/register_validate.php" : "../login/login_validate.php";
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Nếu là trang đăng ký thì mới cần gửi password confirmation
        if (formType === 'register') {
            formData.append('password_confirmation', passwordConfirmation);
        }

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.status === "success") {
                window.location.href = data.redirect; // Chuyển hướng sau khi đăng nhập thành công
                // không thể sử dụng header để chuyển hướng trực tiếp trong php vì đang giữ header('Content-Type: application/json');
                // sử dụng header("Location: ...") sẽ gửi 1 trang html vào json để alert => lỗi
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }        
}
// thêm lệnh cho nút submit register
document.querySelector(".register-form").addEventListener("submit", function(e) {
    validateFormInput(e, 'register');
});
// thêm lệnh cho nút submit login
document.querySelector(".login-form").addEventListener("submit", function(e) {
    validateFormInput(e, 'login');
});

// hiển thị mật khẩu khi ấn vào icon lock
function togglePassword(inputId){
    var passwordInput = document.getElementById(inputId);
    var icon = passwordInput.parentElement.querySelector('i');
    if (passwordInput.type === "password"){
        passwordInput.type = "text"; // đổi type thành text để hiển thị được mật khẩu
        icon.classList.replace("bx-lock-alt", "bxs-lock-open-alt"); // đổi icon thành khóa mở
        
    } else {
        passwordInput.type = "password";
        icon.classList.replace("bxs-lock-open-alt", "bx-lock-alt");
    }
}
