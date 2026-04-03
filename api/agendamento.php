<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

$autoload = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'PHPMailer não instalado.']);
    exit;
}
require $autoload;
require_once __DIR__ . '/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
    exit;
}

function limpa($str) {
    return htmlspecialchars(strip_tags(trim($str ?? '')), ENT_QUOTES, 'UTF-8');
}

$nome        = limpa($data['nome'] ?? '');
$email       = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telefone    = limpa($data['telefone'] ?? '');
$servico     = limpa($data['servico'] ?? '');
$data_visita = limpa($data['data'] ?? '');
$horario     = limpa($data['horario'] ?? '');
$endereco    = limpa($data['endereco'] ?? '');
$complemento = limpa($data['complemento'] ?? '');
$observacoes = limpa($data['observacoes'] ?? '');

if (empty($nome) || empty($email) || empty($telefone) || empty($data_visita) || empty($horario) || empty($endereco)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios não preenchidos.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'E-mail inválido.']);
    exit;
}

if (strtotime($data_visita) < strtotime('today')) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Data inválida.']);
    exit;
}

$servicoMap = [
    'cortinas'  => 'Cortinas',
    'persianas' => 'Persianas',
    'ambos'     => 'Cortinas e Persianas',
    'outro'     => 'Outro',
    ''          => 'Não informado',
];
$servicoLabel = $servicoMap[$servico] ?? 'Não informado';
$dataFormatada = date('d/m/Y', strtotime($data_visita));

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        INSERT INTO agendamentos
            (nome, email, telefone, servico, data_visita, horario, endereco, complemento, observacoes)
        VALUES
            (:nome, :email, :telefone, :servico, :data_visita, :horario, :endereco, :complemento, :observacoes)
    ");

    $stmt->execute([
        ':nome'        => $nome,
        ':email'       => $email,
        ':telefone'    => $telefone,
        ':servico'     => $servico,
        ':data_visita' => $data_visita,
        ':horario'     => $horario,
        ':endereco'    => $endereco,
        ':complemento' => $complemento,
        ':observacoes' => $observacoes,
    ]);

    $id = $pdo->lastInsertId();

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar agendamento.']);
    exit;
}

$htmlAdmin = "
<html><body style='font-family: Arial, sans-serif; color: #333; max-width: 600px;'>
<h2 style='border-bottom: 2px solid #b8860b; padding-bottom: 8px;'>Nova solicitação de visita — AG Cortinas</h2>
<p><strong>ID do agendamento:</strong> #{$id}</p>
<table style='width:100%; border-collapse: collapse;'>
  <tr><td style='padding:8px 0; font-weight:bold; width:160px;'>Nome</td><td>{$nome}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>E-mail</td><td><a href='mailto:{$email}'>{$email}</a></td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Telefone</td><td>{$telefone}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Serviço</td><td>{$servicoLabel}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Data preferida</td><td>{$dataFormatada}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Horário preferido</td><td>{$horario}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Endereço</td><td>{$endereco}" . ($complemento ? " — {$complemento}" : '') . "</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold; vertical-align:top;'>Observações</td><td>" . nl2br($observacoes ?: '—') . "</td></tr>
</table>
<p style='margin-top:24px; font-size:12px; color:#999;'>Solicitado em " . date('d/m/Y \à\s H:i') . " via site agcortinas.com.br</p>
</body></html>
";

$htmlCliente = "
<html><body style='font-family: Arial, sans-serif; color: #333; max-width: 600px;'>
<h2 style='border-bottom: 2px solid #b8860b; padding-bottom: 8px;'>Solicitação de visita recebida!</h2>
<p>Olá, <strong>{$nome}</strong>! Recebemos sua solicitação e entraremos em contato em breve para confirmar o agendamento.</p>
<h3 style='margin-top: 24px;'>Resumo da solicitação</h3>
<table style='width:100%; border-collapse: collapse;'>
  <tr><td style='padding:8px 0; font-weight:bold; width:160px;'>Data preferida</td><td>{$dataFormatada}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Horário preferido</td><td>{$horario}</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Endereço</td><td>{$endereco}" . ($complemento ? " — {$complemento}" : '') . "</td></tr>
  <tr><td style='padding:8px 0; font-weight:bold;'>Serviço</td><td>{$servicoLabel}</td></tr>
</table>
<p style='margin-top: 24px;'>Dúvidas? Entre em contato:<br>
📞 <a href='tel:+5547984211262'>(47) 98421-1262</a><br>
📧 <a href='mailto:agcortinasepersianas@gmail.com'>agcortinasepersianas@gmail.com</a>
</p>
<p style='margin-top: 24px; font-size: 12px; color: #999;'>AG Cortinas e Persianas — agcortinas.com.br</p>
</body></html>
";

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

    $mail->setFrom(SMTP_USER, 'Site AG Cortinas');
    $mail->addAddress(EMAIL_DESTINO, 'AG Cortinas');
    $mail->addReplyTo($email, $nome);
    $mail->isHTML(true);
    $mail->Subject = "Nova visita solicitada — {$nome} ({$dataFormatada} {$horario})";
    $mail->Body    = $htmlAdmin;
    $mail->send();

    $mail->clearAddresses();
    $mail->clearReplyTos();
    $mail->addAddress($email, $nome);
    $mail->Subject = 'Recebemos sua solicitação — AG Cortinas';
    $mail->Body    = $htmlCliente;
    $mail->AltBody = "Olá {$nome}! Recebemos sua solicitação de visita para {$dataFormatada} às {$horario}. Entraremos em contato em breve.";
    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Agendamento solicitado com sucesso.',
        'id'      => $id
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => true,
        'message' => 'Agendamento registrado. Entraremos em contato em breve.',
        'id'      => $id
    ]);
}