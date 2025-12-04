<?php
/**
 * Enhanced Lead Capture Script for Artificial Grass Website
 * Handles form submissions, validates data, saves to CSV, and sends email notifications
 */

// Set timezone
date_default_timezone_set('Europe/London');

// CORS headers (if needed for AJAX requests)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON data or form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'phone', 'email', 'postcode'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = "Missing required field: $field";
    }
}

// Validate email format
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}

// Validate phone number (basic UK phone validation)
if (!empty($input['phone'])) {
    $phone = preg_replace('/[^0-9+]/', '', $input['phone']);
    if (strlen($phone) < 10) {
        $errors[] = 'Invalid phone number';
    }
}

// Validate postcode (basic UK postcode format)
if (!empty($input['postcode'])) {
    $postcode = strtoupper(trim($input['postcode']));
    if (!preg_match('/^[A-Z]{1,2}[0-9]{1,2}[A-Z]? [0-9][A-Z]{2}$/i', $postcode)) {
        // Allow through but log for manual review
    }
}

// Return errors if any
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// Sanitize input
$lead_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => htmlspecialchars(strip_tags(trim($input['name'])), ENT_QUOTES, 'UTF-8'),
    'phone' => htmlspecialchars(strip_tags(trim($input['phone'])), ENT_QUOTES, 'UTF-8'),
    'email' => filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL),
    'postcode' => strtoupper(htmlspecialchars(strip_tags(trim($input['postcode'])), ENT_QUOTES, 'UTF-8')),
    'garden_size' => !empty($input['garden-size']) ? htmlspecialchars(strip_tags($input['garden-size']), ENT_QUOTES, 'UTF-8') : 'Not specified',
    'timeframe' => !empty($input['timeframe']) ? htmlspecialchars(strip_tags($input['timeframe']), ENT_QUOTES, 'UTF-8') : 'Not specified',
    'source' => 'artificial-grass-oldham',
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
];

// Save to CSV file
$csv_file = 'leads/artificial-grass-leads.csv';
$csv_dir = dirname($csv_file);

// Create directory if it doesn't exist
if (!is_dir($csv_dir)) {
    if (!mkdir($csv_dir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Could not create leads directory']);
        exit;
    }
}

// Check if file exists to write headers
$write_headers = !file_exists($csv_file);

// Open file for appending
$file = fopen($csv_file, 'a');
if (!$file) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not save lead']);
    exit;
}

// Write headers if new file
if ($write_headers) {
    fputcsv($file, array_keys($lead_data));
}

// Write lead data
fputcsv($file, array_values($lead_data));
fclose($file);

// Send email notification
$send_email = true; // Set to false to disable email notifications
$your_email = 'info@artificialgrassoldham.co.uk'; // Your email address

if ($send_email) {
    // Email notification
    $subject = 'New Artificial Grass Lead - ' . $lead_data['name'];
    $message = "New lead received from artificial-grass-oldham.co.uk:\n\n";
    $message .= "Name: " . $lead_data['name'] . "\n";
    $message .= "Phone: " . $lead_data['phone'] . "\n";
    $message .= "Email: " . $lead_data['email'] . "\n";
    $message .= "Postcode: " . $lead_data['postcode'] . "\n";
    $message .= "Garden Size: " . $lead_data['garden_size'] . "\n";
    $message .= "Timeframe: " . $lead_data['timeframe'] . "\n";
    $message .= "Timestamp: " . $lead_data['timestamp'] . "\n";
    $message .= "IP Address: " . $lead_data['ip_address'] . "\n";
    
    $headers = 'From: noreply@' . $_SERVER['HTTP_HOST'] . "\r\n" .
               'Reply-To: ' . $lead_data['email'] . "\r\n" .
               'X-Mailer: PHP/' . phpversion() . "\r\n" .
               'Content-Type: text/plain; charset=UTF-8';
    
    // Attempt to send email (don't fail if email fails)
    @mail($your_email, $subject, $message, $headers);
}

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Thank you! We will contact you within 24 hours.',
    'lead_id' => uniqid('LEAD-')
]);
?>

