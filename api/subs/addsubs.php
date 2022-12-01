<?php
require_once '../config.php';

// set the default values from data input
$creator_id = (int)$_POST['creator_id'];
$subscriber_id = (int)$_POST['subscriber_id'];
$creator_name = $_POST['creator_name'];
$subscriber_name = $_POST['subscriber_name'];
$status = $_POST['status'];
// $creator_id = 4;
// $subscriber_id = 6;
// $creator_name = 'bibi';
// $subscriber_name = 'baba';
// $status = 'PENDING';

// xml post structure
$xml_post_string = 
'<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
    <addSubscription xmlns="http://controllers/">
        <!-- Optional -->
        <arg0 xmlns="">
            <creatorId>'.$creator_id.'</creatorId>
            <creatorName>'.$creator_name.'</creatorName>
            <status>'.$status.'</status>
            <subscriberId>'.$subscriber_id.'</subscriberId>
            <subscriberName>'.$subscriber_name.'</subscriberName>
        </arg0>
    </addSubscription>
</Body>
</Envelope>';

// send xml req through curl
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, SOAP_URL);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/xml', 'Authorization: ' . API_KEY));
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $xml_post_string);

$res = curl_exec($curl);
if ($res == false) {
    $err = curl_error($curl);
    echo json_encode($err);
} else {
    echo json_encode($res);
    // sync subscription to app's db
    $query = $con->prepare('INSERT INTO `subscription` (`creator_id`, `subscriber_id`,
    `creator_name`,`subscriber_name`,`status`) VALUES (?, ?, ?, ?, ?)');
    $query->bind_param('iisss', $creator_id, $subscriber_id, $creator_name, $subscriber_name, $status);
    if (!$query->execute()) {
        $result = ["status" => "error", "description" => $con->error];
        http_response_code(500);
        exit(json_encode($result));
    }
    $result = ["status" => "success", "description" => "subscription successfully added"];
    http_response_code(200);
    
    echo json_encode($result);
}
curl_close($curl);
?>