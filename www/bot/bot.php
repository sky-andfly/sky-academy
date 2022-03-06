<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://192.168.1.89/" || $http_origin == "http://testdeveloper.ru/"){  
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

define('TELEGRAM_TOKEN', '1976971330:AAFvyWn6Kn4cZWdABwMvnjrkpRrxmlkadP4');
define('TELEGRAM_CHATID', '-1001501677770');


$type = '📧 От посетителя сайта 📧';

$name = htmlentities($_POST['name']);
$nameFieldset = "Имя: ";
$nameCheck = false;
$phone = htmlentities($_POST['phone']);
$phoneFieldset = "Телефон: ";
$phoneCheck = false;
$email = $_POST['email'];
$emailFieldset = "Email: ";
$emailCheck = false;

if (strlen($name) >= 3) $nameCheck = true;
if ($_POST['country'] === 'ru') {
    if (strlen($phone) === 17) $phoneCheck = true;
} else {
    if (strlen($phone) === 19) $phoneCheck = true;
}
if (strlen($email) >= 5) $emailCheck = true;
if ($nameCheck && $phoneCheck && $emailCheck) {
    $arr = array(
        $type => '',
        $nameFieldset => $name,
        $phoneFieldset => $phone,
        $emailFieldset => $email
    );
    foreach($arr as $key => $value) {
      $txt .= "<b>".$key."</b> ".$value."\n";
    };

    $ch = curl_init();
    curl_setopt_array(
        $ch,
        array(
            CURLOPT_URL => "https://api.telegram.org/bot". TELEGRAM_TOKEN ."/sendMessage",
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => array(
                'chat_id' => TELEGRAM_CHATID,
                'parse_mode' => 'html',
                'text' => $txt,
            ),
        )
    );

    if (curl_exec($ch)) {
      $res['success'] = 1;
    } else {
      $res['success'] = 0;
    }
} else {
    $res['success'] = 0;
    $res['message'] = "Проверьте введенные данные и попробуйте еще раз!";
}
http_response_code(200);
echo json_encode($res, JSON_UNESCAPED_UNICODE);