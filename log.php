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
$datetime = $data['datetime'] ?? date('c');
$trigger = $data['trigger'] ?? 'unknown';
$feedbackResult = $data['feedbackResult'] ?? 'none';
$slotIds = $data['slotIds'] ?? [];
$usageTimeSeconds = $data['usageTimeSeconds'] ?? 0;

// Format slot IDs as semicolon-separated string (to avoid CSV comma issues)
$slotIdsStr = implode(';', $slotIds);

// Log file path (same directory as script)
$logFile = __DIR__ . '/game_logs.csv';

// Check if directory is writable
if (!is_writable(__DIR__)) {
    http_response_code(500);
    echo json_encode(['error' => 'Directory not writable', 'dir' => __DIR__]);
    exit;
}

// Create header if file doesn't exist
$writeHeader = !file_exists($logFile);

// Open file for appending
$fp = @fopen($logFile, 'a');
if (!$fp) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not open log file', 'file' => $logFile, 'exists' => file_exists($logFile), 'writable' => is_writable($logFile)]);
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
