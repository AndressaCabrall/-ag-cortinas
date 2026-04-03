<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
 
require_once __DIR__ . '/config.php';
 
$url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='
     . GOOGLE_PLACE_ID
     . '&fields=name,rating,reviews,user_ratings_total&language=pt-BR&key='
     . GOOGLE_API_KEY;
 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$error    = curl_error($ch);
curl_close($ch);
 
if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Falha ao buscar avaliações: ' . $error]);
    exit;
}
 
echo $response;
 