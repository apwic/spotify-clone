<?php
require_once '../config.php';

// set the default values from data input
$creator_id = $_POST['creator_id'];
$subscriber_id = $_POST['subscriber_id'];
$creator_name = $_POST['creator_name'];
$subscriber_name = $_POST['subscriber_name'];
$status = $_POST['status'];

// xml post structure
$xml_post_string = 
'<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <addSubscription xmlns="http://controllers/">
            <arg0 xmlns="">
                <creatorId>1</creatorId>
                <creatorName>raisa</creatorName>
                <status>PENDING</status>
                <subscriberId>2</subscriberId>
                <subscriberName>yaya</subscriberName>
            </arg0>
        </addSubscription>
    </Body>
</Envelope>';

// send xml req through curl
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, SOAP_URL);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $xml_post_string);

$res = curl_exec($curl);
if ($res == false) {
    $err = curl_error($curl);
    echo json_encode($err);
    
} else {
    // sync subscription to app's db
    $query = $con->prepare('INSERT INTO `subscription` (`creator_id`, `subscriber_id`,
    `creator_name`,`subscriber_name`,`status`) VALUES (?, ?, ?, ?, ?)');
    $query->bind_param('iisss', $creator_id, $subscriber_id, $creator_name, $subscriber_name, $status);
    if (!$query->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
    }
    $result = ["status" => "success", "description" => "subscription successfully added"];
    http_response_code(200);
    
    echo json_encode($result);
}
curl_close($curl);

?>