<?php

require_once "./config.php";

# Check for search params
if(isset($_GET['q']) && $_GET['q'] != "") {
  $q = "%{$_GET['q']}%";
  $prepare_query = "SELECT `song_id`, `judul`, `penyanyi`, `tanggal_terbit`, `genre`, `duration`, `audio_path`, `image_path`, `album_id` 
                    FROM `song` 
                    WHERE LOWER(`judul`) LIKE LOWER(?) OR LOWER(`penyanyi`) LIKE ? OR YEAR(`tanggal_terbit`) = ?";

  # Check if there's a filterkp c
  if(isset($_GET['filter'])){
    $prepare_query .= " AND `genre` = ?";

    # Check if there's a sort
    if(isset($_GET['sort'])){
      if ($_GET['sort'] == "asc") {
        $prepare_query .= " ORDER BY `judul` ASC";
      } else if ($_GET['sort'] == "desc") {
        $prepare_query .= " ORDER BY `judul` DESC";
      }
    }

    $query = $con->prepare($prepare_query);
    $query->bind_param("ssss", $q, $q, $q, $_GET['filter']);
  } else {
    $query = $con->prepare($prepare_query);
    $query->bind_param("sss", $q, $q, $q);
  }

  if(!$query->execute()){
    $result = ["status" => "error", "description" => $con->error];
    http_response_code(500);
    exit(json_encode($result));
  }

  $query_result = $query->get_result();

  $payload = [];
  while($row = $query_result->fetch_assoc()){
    array_push($payload, $row);
  }

  $result = ["status" => "success", "description" => "search completed", "payload" => $payload];
  echo json_encode($result);
} else {
  $result = ["status" => "error", "description" => "no search query"];
  http_response_code(400);
  exit(json_encode($result));
}