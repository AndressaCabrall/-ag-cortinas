<?php
/**
 * AG Cortinas — api/contato.php
 * Recebe JSON do React, envia e-mail via PHPMailer (SMTP Gmail)
 * 
 * Dependência: composer require phpmailer/phpmailer
 * Coloque este arquivo em: /api/contato.php (raiz do servidor)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

// ---- Autoload PHPMailer ----
// Caminho padrão quando instalado via Composer
$autoload = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'PHPMailer não instalado.']);
    exit;
}
require $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ---- Ler JSON do body ----
$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
    exit;
}

// ---- Sanitizar campos ----
function limpa($str) {
    return htmlspecialchars(strip_tags(trim($str ?? '')), ENT_QUOTES, 'UTF-8');
}

$nome     = limpa($data['nome'] ?? '');
$email    = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telefone = limpa($data['telefone'] ?? '');
$servico  = limpa($data['servico'] ?? '');
$mensagem = limpa($data['mensagem'] ?? '');

// ---- Validações básicas ----
if (empty($nome) || empty($email) || empty($telefone)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios não preenchidos.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'E-mail inválido.']);
    exit;
}

// ================================================================
// CONFIGURAÇÃO SMTP — altere apenas esta seção
// ================================================================
define('SMTP_HOST',     'smtp.gmail.com');
define('SMTP_PORT',     587);
define('SMTP_USER',     'agcortinasepersianas@gmail.com'); // sua conta Gmail
define('SMTP_PASS',     'srfpdkconoketaai');          // senha de app do Google
define('EMAIL_DESTINO', 'agcortinasepersianas@gmail.com'); // quem recebe
define('EMAIL_REMETENTE_NOME', 'Site AG Cortinas');
// ================================================================

// ---- Serviço formatado ----
$servicoMap = [
    'cortinas'  => 'Cortinas',
    'persianas' => 'Persianas',
    'ambos'     => 'Cortinas e Persianas',
    'outro'     => 'Outro',
    ''          => 'Não informado',
];
$servicoLabel = $servicoMap[$servico] ?? 'Não informado';

// ---- Montar HTML do e-mail ----
$html = "
<html><body style='font-family: Arial, sans-serif; color: #333; max-width: 600px;'>
<h2 style='border-bottom: 2px solid #b8860b; padding-bottom: 8px;'>Nova mensagem — AG Cortinas</h2>
<table style='width:100%; border-collapse: collapse;'>
  <tr><td style='padding: 8px 0; font-weight: bold; width: 140px;'>Nome</td><td>{$nome}</td></tr>
  <tr><td style='padding: 8px 0; font-weight: bold;'>E-mail</td><td><a href='mailto:{$email}'>{$email}</a></td></tr>
  <tr><td style='padding: 8px 0; font-weight: bold;'>Telefone</td><td>{$telefone}</td></tr>
  <tr><td style='padding: 8px 0; font-weight: bold;'>Serviço</td><td>{$servicoLabel}</td></tr>
  <tr><td style='padding: 8px 0; font-weight: bold; vertical-align: top;'>Mensagem</td><td>" . nl2br($mensagem ?: '—') . "</td></tr>
</table>
<p style='margin-top: 24px; font-size: 12px; color: #999;'>Enviado em " . date('d/m/Y \à\s H:i') . " via site agcortinas.com.br</p>
</body></html>
";

// ---- Enviar via PHPMailer ----
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom(SMTP_USER, EMAIL_REMETENTE_NOME);
    $mail->addAddress(EMAIL_DESTINO, 'AG Cortinas');
    $mail->addReplyTo($email, $nome);

    $mail->isHTML(true);
    $mail->Subject = "Contato via site — {$nome}";
    $mail->Body    = $html;
    $mail->AltBody = "Nome: {$nome}\nE-mail: {$email}\nTelefone: {$telefone}\nServiço: {$servicoLabel}\nMensagem: {$mensagem}";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar e-mail.']);
    // Para debug: error_log($mail->ErrorInfo);
}
