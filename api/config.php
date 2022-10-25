<?php

// set header content type
header('Content-Type: application/json');

// set constant
define('HOST', 'localhost');
define('USER', 'root');
define('PASS', '');
define('DBNAME', 'sepotipayi');
define('PAGE_SIZE', 10);

// connect to database
$con = new mysqli(HOST, USER, PASS, DBNAME);

// this code to check response code for debugging
if ($con->connect_errno) {
    $result = ["status" => "error", "description" => "Cannot connect to database"];
    http_response_code(401);

    exit(json_encode($result));
}

// check is user already logged in
function isUserAlreadyLoggedIn($con) {
    // getting all headers that have been requested
    $headers = getallheaders();

    // empty session token
    if (!isset($headers['sessionToken'])) {
        return -1;
    }

    // get the session token
    $sessionToken = $headers['sessionToken'];

    // check session in database
    $sqlQuery = $con->prepare('SELECT * FROM `SESSIONS` WHERE `session_id` = ?');
    $sqlQuery->bind_param('s', $sessionToken);
    
    // check the query executing
    if (!$sqlQuery->execute()) {
        return -1;
    }

    $queryResult = $sqlQuery->get_result();

    // no data
    if ($queryResult->num_rows == 0) {
        return -1;
    }

    // check if session is still valid
    $rowQueryResult = $queryResult->fetch_assoc();
    $exp = strtotime($rowQueryResult['exp']);
    $curr = time();

    if ($curr > $exp) {
      return -1;
    }

    // return user id and user has logged in
    return $rowQueryResult['user_id'];
}

// check if user is admin
function isAdmin($con, $userId) {
    // get the user id
    $userId = isUserAlreadyLoggedIn($con);

    // doesn't get the user id
    if ($userId == -1) {
        return false;
    }

    // get the data
    $sqlQuery = $con->query('SELECT `isAdmin` FROM `users` WHERE `user_id` = ' . $userId);
    $rowQueryResult = $sqlQuery->fetch_assoc();

    // check the isAdmin column
    if (!$rowQueryResult) {
        return false;
    }

    // return if user is admin or not
    return $rowQueryResult['isAdmin'] == 1;
}