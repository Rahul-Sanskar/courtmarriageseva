<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Please submit the enquiry form to continue.']);
}

/* Basic honeypot: bots often fill hidden fields. */
if (!empty($_POST['website'] ?? '')) {
    respond(200, ['success' => true, 'message' => 'Thank you.']);
}

$name = trim((string)($_POST['name'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$location = trim((string)($_POST['location'] ?? ''));
$service = trim((string)($_POST['service'] ?? 'Court Marriage'));
$message = trim((string)($_POST['message'] ?? ''));
$consent = (string)($_POST['consent'] ?? '');

$name = mb_substr($name, 0, 100);
$phone = mb_substr($phone, 0, 20);
$email = mb_substr($email, 0, 150);
$location = mb_substr($location, 0, 120);
$service = mb_substr($service, 0, 100);
$message = mb_substr($message, 0, 1500);

if (mb_strlen($name) < 2 || !preg_match('/^[+0-9 ()-]{8,20}$/', $phone) || $consent !== 'yes') {
    respond(422, ['success' => false, 'message' => 'Please check your name, phone number and consent, then try again.']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['success' => false, 'message' => 'Please enter a valid email address.']);
}

/* Prevent header injection and remove unexpected control characters. */
if (preg_match('/[\r\n]/', $email) || preg_match('/[\r\n]/', $name)) {
    respond(422, ['success' => false, 'message' => 'Please check the submitted details.']);
}

$config = require __DIR__ . '/config.php';
$recipient = (string)($config['recipient_email'] ?? '');
$sender = (string)($config['sender_email'] ?? 'website@courtmarriageseva.com');
$senderName = (string)($config['sender_name'] ?? 'Court Marriage Seva Website');

if (!filter_var($recipient, FILTER_VALIDATE_EMAIL) || !filter_var($sender, FILTER_VALIDATE_EMAIL)) {
    respond(500, ['success' => false, 'message' => 'The enquiry form is not configured yet. Please contact us by phone or WhatsApp.']);
}

$subject = 'New website enquiry — ' . $service;
$body = "A new enquiry was submitted on the Court Marriage Seva website.\n\n"
    . "Name: {$name}\n"
    . "Phone: {$phone}\n"
    . "Email: " . ($email !== '' ? $email : 'Not provided') . "\n"
    . "City / State: " . ($location !== '' ? $location : 'Not provided') . "\n"
    . "Service: {$service}\n"
    . "Message:\n" . ($message !== '' ? $message : 'No message provided') . "\n\n"
    . "Consent: The visitor agreed to be contacted about this enquiry.\n"
    . "Submitted at: " . date('c') . "\n";

$encodedName = '=?UTF-8?B?' . base64_encode($senderName) . '?=';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $encodedName . ' <' . $sender . '>',
    'Reply-To: ' . ($email !== '' ? $email : $sender),
];

$sent = @mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
if (!$sent) {
    respond(500, ['success' => false, 'message' => 'We could not send your enquiry right now. Please call or WhatsApp our team.']);
}
respond(200, ['success' => true, 'message' => 'Thank you. Your enquiry has been received.']);
