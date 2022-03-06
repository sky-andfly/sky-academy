<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://192.168.0.103/" || $http_origin == "https://sky-academy.online/"){  
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

define('TELEGRAM_TOKEN', '1976971330:AAFHqP4xKTuOAsuLHEJu0I-2Nr9GFMY3z6w');
define('TELEGRAM_CHATID', '-1001501677770');

$type = '📧 От посетителя сайта 📧';

$name = htmlentities($_POST['name']);
$nameFieldset = "Имя: ";
$nameCheck = false;
$phone = htmlentities($_POST['phone']);
$phoneFieldset = "Телефон: ";
$phoneCheck = false;

if (strlen($name) > 0 && strlen($name) <= 50) {
    $nameCheck = true;
} else {
    $res['element'] = '#contact-name';
    if (strlen($name) >= 50) {
        $res['errorMessage'] = 'Имя должно содержать не больше 50 символов!';
    } else if (strlen($name) == 0) {
        $res['errorMessage'] = 'Имя не может быть пустым!';
    }
}
if ($nameCheck) {
    if (strlen($phone) >= 10 && strlen($phone) <= 20) {
        $phoneCheck = true;
    } else {
        $res['element'] = '#contact-phone';
        $res['errorMessage'] = 'Неверный формат телефона!';
    }
}
if ($nameCheck && $phoneCheck) {
    $arr = array(
        $type => '',
        $nameFieldset => $name,
        $phoneFieldset => $phone
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
      $res['message'] = 'Спасибо за обращение, мы обязательно с Вами свяжемся!';
    } else {
      $res['success'] = 0;
      $res['message'] = 'Во время отправки обращения произошла ошибка, повторите попытку немного позже';
    }
} else {
    $res['success'] = 0;
}

http_response_code(200);
echo json_encode($res, JSON_UNESCAPED_UNICODE);