<?php
/**
 * AG Cortinas — api/admin-agendamentos.php
 * 
 * GET  → retorna todos os agendamentos ordenados por data de criação
 * POST → atualiza o status de um agendamento { id, status }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ================================================================
// CONFIGURAÇÃO DO BANCO — mesma do agendamento.php
// ================================================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'agcortinas');
define('DB_USER', 'root');
define('DB_PASS', '');
// ================================================================

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco.']);
    exit;
}

// ---- GET: listar agendamentos ----
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("
        SELECT 
            id, nome, email, telefone, servico,
            data_visita, horario, endereco, complemento,
            observacoes, status, criado_em
        FROM agendamentos
        ORDER BY criado_em DESC
    ");

    $agendamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success'      => true,
        'agendamentos' => $agendamentos,
    ]);
    exit;
}

// ---- POST: atualizar status ----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    $id     = intval($data['id']     ?? 0);
    $status = trim($data['status']   ?? '');

    $statusValidos = ['pendente', 'confirmado', 'cancelado'];

    if (!$id || !in_array($status, $statusValidos)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE agendamentos SET status = :status WHERE id = :id");
    $stmt->execute([':status' => $status, ':id' => $id]);

    echo json_encode(['success' => true, 'message' => 'Status atualizado.']);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
