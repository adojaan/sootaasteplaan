<?php
/**
 * Drop logging script for sootaasteplaan game
 * Logs detailed drop statistics to drop_logs.csv
 * 
 * Expected JSON payload:
 * {
 *   "datetime": "ISO timestamp",
 *   "trigger": "confirm" or "inactivity_reset",
 *   "total_drops": number,
 *   "correct_drops": number,
 *   "incorrect_drops": number,
 *   "failed_drops": number,
 *   "drops": [{"card": "id", "slot": 0-9 or null, "result": "correct|incorrect|fail", "fromSlot": 0-9 or null}],
 *   "usage_time_seconds": number
 * }
 */

// --- SECURITY: Limit POST body size (max 16KB for detailed drop logs) ---
if (isset($_SERVER['CONTENT_LENGTH']) && $_SERVER['CONTENT_LENGTH'] > 16384) {
    http_response_code(413); // Payload Too Large
    echo json_encode(['error' => 'Request too large']);
    exit;
}

// --- SECURITY: Block requests with SQL keywords or PHP code ---
$forbidden_patterns = [
    '/select\s/i', '/union\s/i', '/insert\s/i', '/update\s/i', '/delete\s/i',
    '/drop\s+table/i', '/alter\s/i', '/create\s/i', '/replace\s/i', '/truncate\s/i',
    '/outfile/i', '/load_file/i', '/php\s*\?/i', '/<\?php/i', '/base64_decode/i',
    '/eval\s*\(/i', '/system\s*\(/i', '/exec\s*\(/i', '/passthru\s*\(/i', '/shell_exec\s*\(/i',
    '/\\x/i', '/\\u[0-9a-f]{4}/i', '/\$\{.*\}/i', '/\bscript\b/i', '/\balert\b/i', '/\bdocument\b/i'
];
if (preg_match('/(' . implode('|', array_map(function($p){return trim($p,'/');}, $forbidden_patterns)) . ')/i', file_get_contents('php://input'))) {
    http_response_code(404);
    exit;
}

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON', 'received' => $input]);
    exit;
}

// Get client IP
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// Sanitize function for CSV
function csv_sanitize($val) {
    if (is_string($val) && preg_match('/^[=+\-@]/', $val)) {
        $val = ' ' . $val;
    }
    $val = preg_replace('/[\r\n]+/', ' ', $val);
    return mb_substr($val, 0, 200);
}

// Extract and validate data
$tz = new DateTimeZone('Europe/Tallinn');
$datetime = (new DateTime('now', $tz))->format('Y-m-d H:i:s');
$trigger = csv_sanitize($data['trigger'] ?? 'unknown');
$totalDrops = (int)($data['total_drops'] ?? 0);
$correctDrops = (int)($data['correct_drops'] ?? 0);
$incorrectDrops = (int)($data['incorrect_drops'] ?? 0);
$failedDrops = (int)($data['failed_drops'] ?? 0);
$usageTimeSeconds = (int)($data['usage_time_seconds'] ?? 0);

// Process drops array - convert to JSON string for CSV storage
$dropsArray = $data['drops'] ?? [];
// Validate and sanitize each drop entry
$sanitizedDrops = [];
foreach ($dropsArray as $drop) {
    if (!is_array($drop)) continue;
    $sanitizedDrops[] = [
        'card' => csv_sanitize($drop['card'] ?? ''),
        'slot' => isset($drop['slot']) && $drop['slot'] !== null ? (int)$drop['slot'] : null,
        'result' => csv_sanitize($drop['result'] ?? ''),
        'fromSlot' => isset($drop['fromSlot']) && $drop['fromSlot'] !== null ? (int)$drop['fromSlot'] : null
    ];
}
$dropsJson = json_encode($sanitizedDrops, JSON_UNESCAPED_UNICODE);

// Log file path
$logFile = __DIR__ . '/drop_logs.csv';

// Check if file exists
if (!file_exists($logFile)) {
    // Try to create it
    $created = @file_put_contents($logFile, '');
    if ($created === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Log file does not exist and cannot be created']);
        exit;
    }
    // Write CSV header
    $header = ['datetime', 'ip', 'trigger', 'total_drops', 'correct_drops', 'incorrect_drops', 'failed_drops', 'drops', 'usage_time_seconds'];
    $fp = fopen($logFile, 'w');
    if ($fp) {
        fputcsv($fp, $header);
        fclose($fp);
    }
}

// Check if writable
if (!is_writable($logFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Log file is not writable']);
    exit;
}

// Prepare row data
$row = [
    $datetime,
    $ip,
    $trigger,
    $totalDrops,
    $correctDrops,
    $incorrectDrops,
    $failedDrops,
    $dropsJson,
    $usageTimeSeconds
];

// Append to CSV using file locking
$fp = fopen($logFile, 'a');
if (!$fp) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not open log file']);
    exit;
}

if (flock($fp, LOCK_EX)) {
    fputcsv($fp, $row);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'logged' => [
            'datetime' => $datetime,
            'trigger' => $trigger,
            'total_drops' => $totalDrops,
            'correct_drops' => $correctDrops,
            'incorrect_drops' => $incorrectDrops,
            'failed_drops' => $failedDrops
        ]
    ]);
} else {
    fclose($fp);
    http_response_code(500);
    echo json_encode(['error' => 'Could not lock log file']);
}
