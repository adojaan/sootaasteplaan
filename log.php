// --- SECURITY: Limit POST body size (max 4KB) ---
if (isset($_SERVER['CONTENT_LENGTH']) && $_SERVER['CONTENT_LENGTH'] > 4096) {
    http_response_code(413); // Payload Too Large
    echo json_encode(['error' => 'Request too large']);
    exit;
}

// --- SECURITY: Block requests with SQL keywords or PHP code ---
$forbidden_patterns = [
    '/select\s/i', '/union\s/i', '/insert\s/i', '/update\s/i', '/delete\s/i',
    '/drop\s/i', '/alter\s/i', '/create\s/i', '/replace\s/i', '/truncate\s/i',
    '/outfile/i', '/load_file/i', '/php\s*\?/i', '/<\?php/i', '/base64_decode/i',
    '/eval\s*\(/i', '/system\s*\(/i', '/exec\s*\(/i', '/passthru\s*\(/i', '/shell_exec\s*\(/i',
    '/\\x/i', '/\\u[0-9a-f]{4}/i', '/\$\{.*\}/i', '/\bscript\b/i', '/\balert\b/i', '/\bdocument\b/i'
];
if (preg_match('/(' . implode('|', array_map(function($p){return trim($p,'/');}, $forbidden_patterns)) . ')/i', file_get_contents('php://input'))) {
    http_response_code(404);
    exit;
}

<?php
/**
 * Simple logging script for sootaasteplaan game
 * Place this file on your remote server and update loggingConfig.endpoint in script.js
 * 
 * Logs are stored in CSV format in the same directory as this script.
 * Make sure the log file is writable by the web server (chmod 666 game_logs.csv).
 */

// Error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Allow CORS from any origin (adjust as needed for security)
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
// If multiple IPs (proxies), take the first one
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// Extract data with defaults

function csv_sanitize($val) {
    // Prevent CSV injection: if value starts with =, +, -, @, prepend a space
    if (is_string($val) && preg_match('/^[=+\-@]/', $val)) {
        $val = ' ' . $val;
    }
    // Remove newlines and excessive length
    $val = preg_replace('/[\r\n]+/', ' ', $val);
    return mb_substr($val, 0, 200);
}

$tz = new DateTimeZone('Europe/Tallinn');
$datetime = (new DateTime('now', $tz))->format('Y-m-d H:i:s');
$trigger = csv_sanitize($data['trigger'] ?? 'unknown');
$feedbackResult = csv_sanitize($data['feedbackResult'] ?? 'none');
$slotIds = $data['slotIds'] ?? [];
$usageTimeSeconds = (int)($data['usageTimeSeconds'] ?? 0);

// Sanitize each slotId
$slotIds = array_map('csv_sanitize', $slotIds);

// Format slot IDs as semicolon-separated string (to avoid CSV comma issues)
$slotIdsStr = implode(';', $slotIds);

// Log file path (same directory as script)
$logFile = __DIR__ . '/game_logs.csv';

// Check if file exists - it must be pre-created with proper permissions
// Run: touch game_logs.csv && chmod 666 game_logs.csv
if (!file_exists($logFile)) {
    // Try to create it
    if (@file_put_contents($logFile, '') === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Log file does not exist and cannot be created. Run: touch game_logs.csv && chmod 666 game_logs.csv']);
        exit;
    }
}

// Check if file is writable
if (!is_writable($logFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Log file not writable. Run: chmod 666 game_logs.csv']);
    exit;
}

// Create header if file is empty
$writeHeader = filesize($logFile) === 0;

// Open file for appending
$fp = @fopen($logFile, 'a');
if (!$fp) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not open log file']);
    exit;
}

// Lock file for writing
if (flock($fp, LOCK_EX)) {
    // Write header if new file
    if ($writeHeader) {
        fputcsv($fp, ['datetime', 'ip', 'trigger', 'feedback_result', 'slot_ids', 'usage_time_seconds']);
    }
    
    // Write log entry
    fputcsv($fp, [
        $datetime,
        $ip,
        $trigger,
        $feedbackResult,
        $slotIdsStr,
        $usageTimeSeconds
    ]);
    
    flock($fp, LOCK_UN);
}

fclose($fp);

// Success response
http_response_code(200);
echo json_encode(['status' => 'ok']);
