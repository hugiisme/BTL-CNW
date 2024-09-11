<?php
    header('Content-Type: application/json');
    include("../../shared/database.php");
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $username = $_POST["username"];
        $password = $_POST["password"];

        if (!empty($username) && !empty($password)){
            $query = "SELECT password From users WHERE username = '$username'";
            $result = mysqli_query($conn, $query);

            if (mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_assoc($result);

                if (password_verify($password, $row["password"])){
                    $_SESSION['username'] = $username;
                    echo json_encode(["message" => "Đăng nhập thành công", "status" => "success", "redirect" => "../../Home/index.php"]);
                    exit();
                    
                } else {
                    echo json_encode(["message" => "Sai mật khẩu", "status" => "error"]);
                }

            } else {
                echo json_encode(["message" => "Sai tên đăng nhập", "status" => "error"]);
            }

        } else {
            echo json_encode(["message" => "Chưa nhập mật khẩu hoặc tên đăng nhập", "status" => "error"]); // thừa, js đã xử lý rồi
        }
    } 

    mysqli_close($conn);

?>