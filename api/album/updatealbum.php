<?php
require_once '../config.php';

// set the default values from data input
$image_path = $_POST['image_path'];
$judul = $_POST['judul_album'];
$penyanyi = $_POST['penyanyi_album'];

// insert album to db
$mainquery = $con->prepare(
  'UPDATE `album` 
  SET `image_path` = ?, `judul` = ?, `penyanyi` = ?
  WHERE `album_id` = ?'
);
$mainquery->bind_param('sssi', $image_path, $judul, $penyanyi, $_POST['album_id']);

if (!$mainquery->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "album successfully changed"];
http_response_code(200);

echo json_encode($result);
?>