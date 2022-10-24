<?php

// set header content type
header('Content-Type: application/json');

// set database connection
define('HOST', 'localhost');
define('USER', 'root');
define('PASS', '');
define('DBNAME', 'sepotipayi');

// set constant
define('PAGESIZE', 10);

$con = new mysqli(HOST, USER, PASS, DBNAME);

if ($con->connect_errno) {
  $result = ["status" => "error", "description" => "cannot connect to database"];
  http_response_code(401);
  exit(json_encode($result));
}

// check is user already logged in
function isUserAlreadyLoggedIn($con) {
  // getting token from session
  $headers = getallheaders();

  if (!isset($headers['sessionToken'])) {
    return -1;
  }

  $sessionToken = $headers['sessionToken'];

  // check session in database
  $sqlQuery = $con->prepare('SELECT * FROM `SESSION` WHERE `session_id` = ?');
  $sqlQuery->bind_param('s', $sessionToken);
  $sqlQuery->execute();
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
  return $rowQueryResult['userId'];
}

// check if user is admin
function isAdmin($con, $userId) {
  // get the user id
  $userId = isUserAlreadyLoggedIn($con);

  if ($userId == -1) {
    return false;
  }

  // getting the data
  $sqlQuery = $con->query('SELECT `isAdmin` FROM `USERS` WHERE `user_id` = ' . $userId);
  $rowQueryResult = $sqlQuery->fetch_assoc();

  // checking
  if (!$rowQueryResult) {
    return false;
  }

  return $rowQueryResult['isAdmin'] == 1;
}