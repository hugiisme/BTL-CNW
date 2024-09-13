<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();

    try {
        if ($_SERVER["REQUEST_METHOD"] != "POST") {
            echo json_encode(["message" => "Invalid request method", "status" => "error"]);
            exit();
        }
    
        $username = trim($_POST["username_delete"]);
        $password = trim($_POST["password_delete"]);
    
        if (empty($username) || empty($password)) {
            echo json_encode(["message" => "Chưa nhập mật khẩu hoặc tên đăng nhập", "status" => "error"]);
            exit();
        }
    
        if ($username != $_SESSION["username"]) {
            echo json_encode(["message" => "Sai tên đăng nhập", "status" => "error"]);
            exit();
        }
    
        $query = "SELECT password FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
    
        if (mysqli_num_rows($result) == 0) {
            echo json_encode(["message" => "Sai tên đăng nhập", "status" => "error"]);
            exit();
        }
    
        $row = mysqli_fetch_assoc($result);
    
        if (!password_verify($password, $row["password"])) {
            echo json_encode(["message" => "Sai mật khẩu", "status" => "error"]);
            exit();
        }
    
        $deleteQuery = "DELETE FROM users WHERE username = '$username'";
        if (mysqli_query($conn, $deleteQuery)) {
            echo json_encode(["message" => "Xóa tài khoản thành công", "status" => "success"]);
        } else {
            echo json_encode(["message" => "Không thể xóa tài khoản", "status" => "error"]);
        }
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }
?>

<?php
    // header("Content-Type: application/json");
    // include("../shared/database.php");
    // session_start();

    // if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //     $username = trim($_POST["username_delete"]);
    //     $password = trim($_POST["password_delete"]);
        
    //     if(!empty($username) && !empty($password)){
    //         if($username != $_SESSION["username"]){
    //             echo json_encode(["message" => "Sai tên đăng nhập", "status"=>"error"]);
    //             exit();
    //         }

    //         $query = "SELECT password From users WHERE username = '$username'";
    //         $result = mysqli_query($conn, $query);

    //         if (mysqli_num_rows($result) > 0){
    //             $row = mysqli_fetch_assoc($result);
    //             if (password_verify($password, $row["password"])){
    //                 $deleteQuery = "DELETE FROM users WHERE username = '$username'";
    //                 if (mysqli_query($conn, $deleteQuery)){
    //                     echo json_encode(["message" => "Xóa tài khoản thành công", "status"=>"success"]);
    //                 } else {
    //                     echo json_encode(["message" => "Không thể xóa tài khoản", "status"=>"error"]);
    //                 }
    //             } else {
    //                 echo json_encode(["message" => "Sai mật khẩu", "status"=>"error"]);
    //             }
    //         } else {
    //             echo json_encode(["message" => "Sai tên đăng nhập", "status"=>"error"]);
    //         }
    //     } else {
    //         echo json_encode(["message" => "Chưa nhập mật khẩu hoặc tên đăng nhập", "status"=>"error"]);
    //     }
    // }

    // mysqli_close($conn);
?>