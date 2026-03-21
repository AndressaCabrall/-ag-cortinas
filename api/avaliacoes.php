<?php

// Permite requisições do frontend
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Chave e Place ID
$apiKey = 'AIzaSyAnwtkgIAGEgkK2CsNNO14D7dA9CNd_i9k';
$placeId = 'ChIJx4yyf-6aoIoREeW0jKFv-PE';

// URL da API do Google
$url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' . $placeId . '&fields=name,rating,reviews,user_ratings_total&language=pt-BR&key=' . $apiKey;

// Faz a chamada para a API
$response = file_get_contents($url);

// Retorna o resultado para o React
echo $response;