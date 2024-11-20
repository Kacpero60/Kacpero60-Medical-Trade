<?php

require 'vendor/autoload.php'; // Ładowanie autoloadera Composer

// Ładowanie danych z pliku .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Pobierz dane z formularza
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $companyName = htmlspecialchars($_POST['company']);
    $email = htmlspecialchars($_POST['email']);
    $zipCode = htmlspecialchars($_POST['zipcode']);
    $country = htmlspecialchars($_POST['country']);
    $productName = htmlspecialchars($_POST['product']);
    $referenceCode = htmlspecialchars($_POST['reference']);
    $quantity = htmlspecialchars($_POST['quantity']);
    $shipping = htmlspecialchars($_POST['shipping']);
    $message = htmlspecialchars($_POST['message']);

    // Dane e-maila
    $to = getenv('EMAIL_USER'); // Adres docelowy (np. office@jasema.pl)
    $subject = "New Inquiry from $companyName";
    $body = "
        <h3>New message from the Inquiry form</h3>
        <p><strong>Company Name:</strong> $companyName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>City Zip Code:</strong> $zipCode</p>
        <p><strong>Country:</strong> $country</p>
        <p><strong>Product Name:</strong> $productName</p>
        <p><strong>Reference / Code:</strong> $referenceCode</p>
        <p><strong>Quantity:</strong> $quantity</p>
        <p><strong>Shipping:</strong> $shipping</p>
        <p><strong>Message:</strong> $message</p>
    ";
    $headers = "From: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Wysyłka e-maila
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send the message.";
    }
} else {
    echo "Invalid request.";
}
?>
