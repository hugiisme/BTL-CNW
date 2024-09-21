<?php
    include("../shared/database.php");
    include("../shared/session_check.php");

    try {
        header('Content-Type: application/json');
        if ($_SESSION["role"] !== "admin") {
            echo json_encode(["redirect" => "../Home/index.php"]);
            exit();
        }
        
        $users = [];
        $sql = "SELECT user_id, role, name, email, create_at, update_at FROM users WHERE 1=1"; // 1=1 luôn true, để không bị lỗi câu lệnh AND đằng sau nếu lỡ không có WHERE đằng trước
        if ($_GET["search_content"] != '' && $_GET["search_by"] != '') {
            $search = mysqli_real_escape_string($conn, $_GET["search_content"]); 
            $search_by = $_GET["search_by"];
            $sql .= " AND $search_by LIKE '%$search%'";
        } 
        
        $filterBy = isset($_GET["filter_by"]) ? $_GET["filter_by"] : '';
        if($filterBy){
            $sql .= " AND role = '$filterBy'";
        }
        
        $sortOrder = $_GET["sort_order"];
        $sortBy = $_GET["sort_by"];

        if ($sortOrder === 'asc') {
            $sql .= " ORDER BY $sortBy ASC";
        } else if ($sortOrder === 'desc') {
            $sql .= " ORDER BY $sortBy DESC";
        }

        $result = mysqli_query($conn, $sql);
        $totalResult = mysqli_num_rows($result);

        if (isset($_GET["page"]) && isset($_GET["limit"])){
            $limit = $_GET["limit"];
            $page = $_GET["page"] - 1;
            $offset = $page*$limit;
            $sql .= " LIMIT $limit OFFSET $offset";
        }

        error_log($sql); 
        $result = mysqli_query($conn, $sql);
        
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
    
        echo json_encode([
            "users" => $users,
            "total" => $totalResult
        ]);
        
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }
?>