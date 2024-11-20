<?php

require __DIR__ . '/vendor/autoload.php'; // Ładowanie autoloadera Composer

// Sprawdź, czy klasa PHPMailer jest załadowana
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    echo "PHPMailer załadowany poprawnie!<br>";
} else {
    echo "Błąd: Klasa PHPMailer nie została załadowana!<br>";
    die();
}

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

    // Ustawienia PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    // Debugowanie SMTP
    $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_SERVER; // Wyświetl szczegóły komunikacji SMTP
    $mail->Debugoutput = 'html'; // Format debugowania

    try {
        // Ustawienia serwera SMTP
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USER'); // Adres e-mail
        $mail->Password = getenv('SMTP_PASS'); // Hasło
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; // Szyfrowanie TLS
        $mail->Port = getenv('SMTP_PORT'); // Port SMTP

        // Dane nadawcy i odbiorcy
        $mail->setFrom(getenv('SMTP_USER'), 'Medical Trade');
        $mail->addAddress(getenv('EMAIL_USER')); // Adres odbiorcy

        // Treść e-maila
        $mail->isHTML(true);
        $mail->Subject = "New Inquiry from $companyName";
        $mail->Body = "
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

        // Wysłanie e-maila
        if ($mail->send()) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send the message.";
        }
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request.";
}
