<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once __DIR__ . '/config.php';

$url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' . GOOGLE_PLACE_ID . '&fields=name,rating,reviews,user_ratings_total&language=pt-BR&key=' . GOOGLE_API_KEY;

$response = file_get_contents($url);
echo $response;