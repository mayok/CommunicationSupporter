<?php
include dirname(__FILE__).'/config.php';

if( isset($_POST["id"])     && 
    isset($_POST["name"])   && 
    isset($_POST["data"])   && 
    !empty($_POST["id"])    && 
    !empty($_POST["name"])  && 
    !empty($_POST["data"])) {

    $to      = $address[$_POST["id"]];
    $subject = 'callsign: ' . $_POST["data"];
    $data    = $_POST["data"];
    $headers = 'From: callsign@example.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();

    if(!($to == "")) 
      mail($to, $subject, $data, $headers);
}
