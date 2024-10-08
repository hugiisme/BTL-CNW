<?php
    include("../shared/database.php");
    session_start();

    header('Content-Type: application/json');

    $rawData = file_get_contents("php://input"); // vì lần này không sử dụng formData mà gửi file định dạng json tới server nên là phải dùng file_get_contents("php://input") rồi decode để lấy dữ liệu
    $data = json_decode($rawData, true); // true để dữ liệu trả lại dạng array, false thì thành php object

    $name = $data['name'];
    $action = $data['action']; 

    if ($action == "delete") {
        $query = "SELECT * FROM users WHERE name = '$name'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);

        if ($row["role"] != "admin") {
            $editQuery = "DELETE FROM users WHERE name = '$name'";
        } else {
            if ($name == $_SESSION["name"]){
                echo json_encode(["message" => "Hãy vào Thông Tin Tài Khoản để xóa tài khoản của bản thân", "status" => "error"]);
                exit();
            }
            echo json_encode(["message" => "Không thể xóa admin khác", "status" => "error"]);
            exit();
        }
    } else {
        $role = $data["role"];
        $editQuery = "UPDATE users SET role = '$role' WHERE name = '$name'";
        if ($name == $_SESSION["name"]){
            $_SESSION['role'] = $role;
        }
    }

    if (mysqli_query($conn, $editQuery)) {
        echo json_encode(["message" => "Đã update dữ liệu thành công", "status" => "success"]);
    } else {
        echo json_encode(["message" => "Không thể update dữ liệu", "status" => "error"]);
    }
?>
