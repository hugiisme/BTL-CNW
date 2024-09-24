<?php
    include("../shared/database.php");
    include("../shared/session_check.php");

    try {
        header('Content-Type: application/json');
        if ($_SESSION["role"] !== "admin") {
            echo json_encode(["redirect" => "../Home/index.php"]);
            exit();
        }

        $majors = [];
        $sql = "SELECT major_id, major_name, description, start_date, end_date FROM major WHERE 1=1";
        if ($_GET["search_content"] != ''){
            $search_content = $_GET["search_content"];
            $sql .= "AND major_name LIKE %$search_content%";
        }

        error_log($sql);
        $result = mysqli_query($conn, $sql);
        $totalResult = mysqli_num_rows($result);

        while ($row = mysqli_fetch_assoc($result)) {
            $majors[] = $row;
        }

        echo json_encode([
            "majors" => $majors,
            "total" => $totalResult
        ]);

        
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }
?>