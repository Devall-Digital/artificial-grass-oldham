<?php
/**
 * GitHub Webhook Auto-Deploy Script
 * This script automatically pulls updates from GitHub when triggered by a webhook
 * Created for artificial-grass-oldham.com automatic deployment
 */

// Configuration
$SECRET_TOKEN = 'qWyy8468tOExnAk2aAbHDhPVs8BMNnBG';
$REPO_PATH = '/home/sites/34b/1/1e361d1835/public_html';
$BRANCH = 'main'; // Branch to deploy
$LOG_FILE = 'deploy.log'; // Log file for deployment history

// Function to log messages
function logMessage($message) {
    global $LOG_FILE;
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message\n";
    file_put_contents($LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
}

// Function to execute shell commands safely
function executeCommand($command) {
    $output = [];
    $returnVar = 0;
    exec($command . ' 2>&1', $output, $returnVar);
    return [
        'output' => implode("\n", $output),
        'success' => $returnVar === 0
    ];
}

// Start logging
logMessage("=== Deployment Request Received ===");
logMessage("Request Method: " . $_SERVER['REQUEST_METHOD']);
logMessage("User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'));
logMessage("Remote Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'));

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logMessage("ERROR: Only POST requests are allowed");
    http_response_code(405);
    die('Method Not Allowed');
}

// Get the request body
$payload = file_get_contents('php://input');
$headers = getallheaders();

// Verify GitHub signature (security check)
if (!isset($headers['X-Hub-Signature-256'])) {
    logMessage("ERROR: No GitHub signature found");
    http_response_code(401);
    die('Unauthorized: Missing signature');
}

$githubSignature = $headers['X-Hub-Signature-256'];
$expectedSignature = 'sha256=' . hash_hmac('sha256', $payload, $SECRET_TOKEN);

if (!hash_equals($expectedSignature, $githubSignature)) {
    logMessage("ERROR: Invalid GitHub signature");
    http_response_code(401);
    die('Unauthorized: Invalid signature');
}

// Parse the payload
$data = json_decode($payload, true);

if (!$data) {
    logMessage("ERROR: Invalid JSON payload");
    http_response_code(400);
    die('Bad Request: Invalid JSON');
}

// Check if this is a push to the main branch
if (!isset($data['ref']) || $data['ref'] !== "refs/heads/$BRANCH") {
    logMessage("INFO: Push to non-main branch, skipping deployment");
    echo "Push to non-main branch, deployment skipped";
    exit;
}

logMessage("SUCCESS: Valid push to $BRANCH branch detected");
logMessage("Repository: " . ($data['repository']['full_name'] ?? 'Unknown'));
logMessage("Pusher: " . ($data['pusher']['name'] ?? 'Unknown'));
logMessage("Commits: " . count($data['commits'] ?? []));

// Change to repository directory
if (!is_dir($REPO_PATH)) {
    logMessage("ERROR: Repository path does not exist: $REPO_PATH");
    http_response_code(500);
    die('Internal Server Error: Repository path not found');
}

// Execute git pull
logMessage("Starting git pull...");

// First, let's check git status
$statusResult = executeCommand("cd $REPO_PATH && git status --porcelain");
if (!empty($statusResult['output'])) {
    logMessage("WARNING: Working directory has changes: " . $statusResult['output']);
}

// Fetch latest changes
$fetchResult = executeCommand("cd $REPO_PATH && git fetch origin $BRANCH");
logMessage("Git fetch result: " . ($fetchResult['success'] ? 'SUCCESS' : 'FAILED'));
if (!$fetchResult['success']) {
    logMessage("Git fetch output: " . $fetchResult['output']);
}

// Pull the changes
$pullResult = executeCommand("cd $REPO_PATH && git pull origin $BRANCH");
logMessage("Git pull result: " . ($pullResult['success'] ? 'SUCCESS' : 'FAILED'));
logMessage("Git pull output: " . $pullResult['output']);

if ($pullResult['success']) {
    // Get the latest commit info
    $commitResult = executeCommand("cd $REPO_PATH && git log -1 --pretty=format:'%h - %s (%an, %ar)'");
    if ($commitResult['success']) {
        logMessage("Latest commit: " . $commitResult['output']);
    }
    
    logMessage("=== Deployment Completed Successfully ===");
    echo "Deployment successful! Latest commit: " . ($commitResult['output'] ?? 'Unknown');
} else {
    logMessage("ERROR: Git pull failed: " . $pullResult['output']);
    http_response_code(500);
    die('Deployment failed: ' . $pullResult['output']);
}

// Optional: Clear any caches or run additional commands
// Uncomment the following lines if you need to clear caches or run build commands
/*
logMessage("Running post-deployment commands...");
$cacheResult = executeCommand("cd $REPO_PATH && php artisan cache:clear"); // Example for Laravel
if ($cacheResult['success']) {
    logMessage("Cache cleared successfully");
} else {
    logMessage("Cache clear failed: " . $cacheResult['output']);
}
*/

logMessage("=== Deployment Process Complete ===");
?> 