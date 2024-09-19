function validateLoginForm(e){
    e.preventDefault();

    var isValid = true;
    var username = document.getElementById("login-username").value.trim(); // lấy giá trị của input và bỏ khoảng trắng
    var password = document.getElementById("login-password").value.trim();

    var usernameError = document.getElementById("username-error");
    var passwordError = document.getElementById("password-error");

    // làm mới error message
    usernameError.textContent = '';
    passwordError.textContent = '';

    if(username == ''){
        usernameError.textContent = "Tên đăng nhập là bắt buộc";
        isValid = false;
    }

    if(password == ''){
        passwordError.textContent = "Mật khẩu là bắt buộc";
        isValid = false;
    }

    if (!isValid){
        return; // không submit form lên server nếu có lỗi có thể hiển thị bằng js
    }

    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch("login_process.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if(data.status == "success"){
                window.location.href = "../../Home/index.php"; // Chuyển hướng sau khi đăng nhập thành công
                // không thể sử dụng header để chuyển hướng trực tiếp trong php vì đang giữ header('Content-Type: application/json');
                // sử dụng header("Location: ...") sẽ gửi 1 trang html vào json để alert => lỗi
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.querySelector(".login-form").addEventListener("submit", validateLoginForm);