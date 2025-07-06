<?php
/**
 * DEBUG VERSION - Webhook Auto-Deploy Script
 * This version helps identify what's causing the 500 error
 */

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration
$SECRET_TOKEN = 'qWyy8468tOExnAk2aAbHDhPVs8BMNnBG';
$REPO_PATH = '/home/sites/34b/1/1e361d1835/public_html';
$BRANCH = 'main';
$LOG_FILE = 'debug-deploy.log';

// Simple logging function
function debugLog($message) {
    global $LOG_FILE;
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message" . PHP_EOL;
    
    // Try to write to log, but don't fail if it doesn't work
    try {
        file_put_contents($LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    } catch (Exception $e) {
        // Log to error log instead
        error_log("Debug log failed: " . $e->getMessage());
    }
}

debugLog("=== DEBUG WEBHOOK STARTED ===");
debugLog("PHP Version: " . phpversion());
debugLog("Request Method: " . ($_SERVER['REQUEST_METHOD'] ?? 'Unknown'));

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    debugLog("ERROR: Not a POST request");
    http_response_code(405);
    echo 'Method Not Allowed - This webhook expects POST requests from GitHub';
    exit;
}

debugLog("POST request confirmed");

// Check if we can get headers
$headers = [];
if (function_exists('getallheaders')) {
    debugLog("Using getallheaders()");
    $headers = getallheaders();
} else {
    debugLog("getallheaders() not available, using alternative method");
    // Alternative method for getting headers
    foreach ($_SERVER as $key => $value) {
        if (strpos($key, 'HTTP_') === 0) {
            $header = str_replace('_', '-', substr($key, 5));
            $headers[$header] = $value;
        }
    }
}

debugLog("Headers found: " . count($headers));

// Check for GitHub signature
$githubSig = null;
if (isset($headers['X-Hub-Signature-256'])) {
    $githubSig = $headers['X-Hub-Signature-256'];
    debugLog("Found X-Hub-Signature-256");
} elseif (isset($headers['X-HUB-SIGNATURE-256'])) {
    $githubSig = $headers['X-HUB-SIGNATURE-256'];
    debugLog("Found X-HUB-SIGNATURE-256 (uppercase)");
} else {
    debugLog("ERROR: No GitHub signature found");
    debugLog("Available headers: " . implode(', ', array_keys($headers)));
    http_response_code(401);
    echo 'Unauthorized: Missing GitHub signature';
    exit;
}

// Get payload
$payload = file_get_contents('php://input');
debugLog("Payload received, length: " . strlen($payload));

// Verify signature
$expectedSignature = 'sha256=' . hash_hmac('sha256', $payload, $SECRET_TOKEN);
debugLog("Expected signature starts with: " . substr($expectedSignature, 0, 20) . "...");
debugLog("Received signature starts with: " . substr($githubSig, 0, 20) . "...");

if (!hash_equals($expectedSignature, $githubSig)) {
    debugLog("ERROR: Signature mismatch");
    http_response_code(401);
    echo 'Unauthorized: Invalid signature';
    exit;
}

debugLog("Signature verified successfully");

// Parse JSON
$data = json_decode($payload, true);
if (!$data) {
    debugLog("ERROR: Failed to parse JSON");
    http_response_code(400);
    echo 'Bad Request: Invalid JSON';
    exit;
}

debugLog("JSON parsed successfully");
debugLog("Repository: " . ($data['repository']['full_name'] ?? 'Unknown'));
debugLog("Branch ref: " . ($data['ref'] ?? 'Unknown'));

// Check branch
if (!isset($data['ref']) || $data['ref'] !== "refs/heads/$BRANCH") {
    debugLog("INFO: Push to non-main branch, skipping");
    echo "Push to non-main branch, deployment skipped";
    exit;
}

debugLog("Valid push to main branch detected");

// Check if directory exists
if (!is_dir($REPO_PATH)) {
    debugLog("ERROR: Repository path does not exist: $REPO_PATH");
    http_response_code(500);
    echo 'Internal Server Error: Repository path not found';
    exit;
}

debugLog("Repository path exists");

// Test if exec() function is available
if (!function_exists('exec')) {
    debugLog("ERROR: exec() function is not available");
    http_response_code(500);
    echo 'Internal Server Error: exec() function disabled';
    exit;
}

debugLog("exec() function is available");

// Try a simple command first
$output = [];
$returnVar = 0;
exec('pwd 2>&1', $output, $returnVar);
debugLog("Test command (pwd) result: " . ($returnVar === 0 ? 'SUCCESS' : 'FAILED'));
debugLog("Test command output: " . implode(' ', $output));

// Try git command
$output = [];
$returnVar = 0;
exec("cd $REPO_PATH && git --version 2>&1", $output, $returnVar);
debugLog("Git version check: " . ($returnVar === 0 ? 'SUCCESS' : 'FAILED'));
debugLog("Git output: " . implode(' ', $output));

// Try git status
$output = [];
$returnVar = 0;
exec("cd $REPO_PATH && git status --porcelain 2>&1", $output, $returnVar);
debugLog("Git status check: " . ($returnVar === 0 ? 'SUCCESS' : 'FAILED'));
debugLog("Git status output: " . implode(' ', $output));

// Finally, try git pull
$output = [];
$returnVar = 0;
exec("cd $REPO_PATH && git pull origin $BRANCH 2>&1", $output, $returnVar);
debugLog("Git pull result: " . ($returnVar === 0 ? 'SUCCESS' : 'FAILED'));
debugLog("Git pull output: " . implode(' ', $output));

if ($returnVar === 0) {
    debugLog("=== DEPLOYMENT SUCCESSFUL ===");
    echo "Deployment successful!";
} else {
    debugLog("ERROR: Deployment failed");
    http_response_code(500);
    echo "Deployment failed: " . implode(' ', $output);
}

debugLog("=== DEBUG WEBHOOK COMPLETED ===");
?> 