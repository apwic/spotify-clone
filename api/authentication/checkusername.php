<?php
require_once '../config.php';

if (!isset($_POST['username'])) {
    $result = ["status" => "error", "description" => "Invalid"];
    http_response_code(404);

    exit(json_encode($result));
} else {
    $username = $_POST['username'];

    $sqlQuery = $con->prepare("SELECT `username` FROM `users` WHERE `username` = ?");
    $sqlQuery->bind_param('s', $username);

    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Query not executed"];
        http_response_code(500);

        exit(json_encode($result));
    }

    $queryResult = $sqlQuery->get_result();

    if ($queryResult->num_rows != 0) {
        $result = ["status" => "error", "description" => "Username already taken", "code" => "user"];
        http_response_code(200);

        echo json_encode($result);
    } else {
        $result = ["status" => "success", "description" => "Username is available", "code" => "user"];
        http_response_code(200);
    
        echo json_encode($result);
    }

}

?>