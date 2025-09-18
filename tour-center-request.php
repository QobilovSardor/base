<?php
header('Content-Type: application/json; charset=utf-8');

// token fayl yo'li
$tokenFile = __DIR__ . "/token.txt";

// tokenni olish funksiyasi
function getToken($file) {
    if (!file_exists($file)) {
        return null;
    }
    return trim(file_get_contents($file));
}

// tokenni yangilash funksiyasi
function updateToken($file, $newToken) {
    return file_put_contents($file, trim($newToken)) !== false;
}

// Telegram xabar yuborish funksiyasi
function sendMessage($token, $chatId, $message) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        "chat_id" => $chatId,
        "text" => $message,
        "parse_mode" => "HTML"
    ];

    $options = [
        "http" => [
            "header"  => "Content-Type: application/x-www-form-urlencoded\r\n",
            "method"  => "POST",
            "content" => http_build_query($data),
            "timeout" => 10
        ]
    ];
    $context = stream_context_create($options);
    return file_get_contents($url, false, $context);
}

// agar token yangilash so'rovi kelsa
if (isset($_REQUEST['update_token'])) {
    $newToken = $_REQUEST['update_token'];
    if (updateToken($tokenFile, $newToken)) {
        echo json_encode(["status" => "success", "message" => "Token успешно обновлён"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Не удалось обновить токен"]);
    }
    exit;
}

// tokenni o‘qish
$token = getToken($tokenFile);
if (!$token) {
    echo json_encode(["status" => "error", "message" => "Токен не найден"]);
    exit;
}

// chat_id majburiy
if (!isset($_REQUEST['chat_id']) || empty($_REQUEST['chat_id'])) {
    echo json_encode(["status" => "error", "message" => "chat_id обязателен"]);
    exit;
}

$chatId = $_REQUEST['chat_id'];

// optional maydonlar
$name    = $_REQUEST['name']    ?? null;
$phone   = $_REQUEST['phone']   ?? null;
$city    = $_REQUEST['city']    ?? null;
$comment = $_REQUEST['comment'] ?? null;

// xabar matnini rus tilida formatlash
$message = "<b>📩 Новая заявка</b>\n\n";
if ($name)    $message .= "👤 Имя: $name\n";
if ($phone)   $message .= "📞 Телефон: $phone\n";
if ($city)    $message .= "🏙 Город: $city\n";
if ($comment) $message .= "💬 Комментарий: $comment\n";

// yuborish
$result = sendMessage($token, $chatId, $message);

if ($result) {
    echo json_encode(["status" => "success", "message" => "Сообщение отправлено"]);
} else {
    echo json_encode(["status" => "error", "message" => "Ошибка при отправке"]);
}
