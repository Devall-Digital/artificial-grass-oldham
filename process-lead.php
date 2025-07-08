<?php
// Simple lead capture script for artificial grass website
// This saves leads to a CSV file and can email notifications

// Set timezone
date_default_timezone_set('Europe/London');

// CORS headers (if needed for AJAX requests)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method not allowed');
}

// Get JSON data or form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'phone', 'email', 'postcode'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        die(json_encode(['error' => "Missing required field: $field"]));
    }
}

// Sanitize input
$lead_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => filter_var($input['name'], FILTER_SANITIZE_STRING),
    'phone' => filter_var($input['phone'], FILTER_SANITIZE_STRING),
    'email' => filter_var($input['email'], FILTER_SANITIZE_EMAIL),
    'postcode' => filter_var($input['postcode'], FILTER_SANITIZE_STRING),
    'garden_size' => filter_var($input['garden-size'] ?? 'Not specified', FILTER_SANITIZE_STRING),
    'timeframe' => filter_var($input['timeframe'] ?? 'Not specified', FILTER_SANITIZE_STRING),
    'source' => 'artificial-grass-manchester',
    'partner' => 'unreal-lawns',
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
];

// Validate email
if (!filter_var($lead_data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode(['error' => 'Invalid email address']));
}

// Save to CSV file
$csv_file = 'leads/artificial-grass-leads.csv';
$csv_dir = dirname($csv_file);

// Create directory if it doesn't exist
if (!is_dir($csv_dir)) {
    mkdir($csv_dir, 0755, true);
}

// Check if file exists to write headers
$write_headers = !file_exists($csv_file);

// Open file for appending
$file = fopen($csv_file, 'a');
if (!$file) {
    http_response_code(500);
    die(json_encode(['error' => 'Could not save lead']));
}

// Write headers if new file
if ($write_headers) {
    fputcsv($file, array_keys($lead_data));
}

// Write lead data
fputcsv($file, array_values($lead_data));
fclose($file);

// Send email notification (configure these settings)
$send_email = false; // Set to true when ready for production
$your_email = 'info@artificialgrassoldham.co.uk'; // Replace with your email
$partner_email = 'leads@unreallawns.co.uk'; // Replace with partner's email

if ($send_email && $your_email !== 'info@artificialgrassoldham.co.uk') {
    // Email to yourself
    $subject = 'New Artificial Grass Lead - ' . $lead_data['name'];
    $message = "New lead received:\n\n";
    foreach ($lead_data as $key => $value) {
        $message .= ucfirst(str_replace('_', ' ', $key)) . ": $value\n";
    }
    
    $headers = 'From: noreply@' . $_SERVER['HTTP_HOST'] . "\r\n" .
               'Reply-To: ' . $lead_data['email'] . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
    
    mail($your_email, $subject, $message, $headers);
    
    // Email to partner (if configured)
    if ($partner_email !== 'partner@unreallawns.co.uk') {
        $partner_subject = 'New Lead: Artificial Grass Installation';
        $partner_message = "You have received a new lead:\n\n";
        $partner_message .= "Name: " . $lead_data['name'] . "\n";
        $partner_message .= "Phone: " . $lead_data['phone'] . "\n";
        $partner_message .= "Email: " . $lead_data['email'] . "\n";
        $partner_message .= "Postcode: " . $lead_data['postcode'] . "\n";
        $partner_message .= "Garden Size: " . $lead_data['garden_size'] . "\n";
        $partner_message .= "Timeframe: " . $lead_data['timeframe'] . "\n";
        $partner_message .= "\nPlease contact them as soon as possible.";
        
        mail($partner_email, $partner_subject, $partner_message, $headers);
    }
}

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Thank you! We will contact you shortly.',
    'lead_id' => uniqid('LEAD-')
]);
?>