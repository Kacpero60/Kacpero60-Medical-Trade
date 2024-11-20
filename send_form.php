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
    $email = htmlspecialchars($_POST['email']); // Email osoby wypełniającej formularz
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
        $mail->Username = getenv('SMTP_USER'); // Adres do logowania SMTP
        $mail->Password = getenv('SMTP_PASS'); // Hasło do logowania SMTP
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; // Szyfrowanie TLS
        $mail->Port = getenv('SMTP_PORT'); // Port SMTP

        // Ustawienie nadawcy jako użytkownika wypełniającego formularz
        $mail->setFrom($email, $companyName); // Nadawca: adres e-mail i nazwa firmy osoby wypełniającej formularz

        // Stały odbiorca: adres e-mail firmy (Jasema)
        $mail->addAddress(getenv('EMAIL_USER')); // Adres odbiorcy (np. office@jasema.pl)

        // Treść e-maila
        $mail->isHTML(true);
        $mail->Subject = "Nowe zamówienie od $companyName";
        $mail->Body = "
            <h3>Nowe zamówienie z formularza:</h3>
            <p><strong>Nazwa firmy:</strong> $companyName</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Kod pocztowy:</strong> $zipCode</p>
            <p><strong>Kraj:</strong> $country</p>
            <p><strong>Nazwa produktu:</strong> $productName</p>
            <p><strong>Kod referencyjny:</strong> $referenceCode</p>
            <p><strong>Ilość:</strong> $quantity</p>
            <p><strong>Rodzaj wysyłki:</strong> $shipping</p>
            <p><strong>Wiadomość:</strong> $message</p>
        ";

        // Wysłanie e-maila
        if ($mail->send()) {
            echo "Formularz został wysłany pomyślnie!";
        } else {
            echo "Błąd: Nie udało się wysłać formularza.";
        }
    } catch (Exception $e) {
        echo "Błąd PHPMailer: {$mail->ErrorInfo}";
    }
} else {
    echo "Nieprawidłowe żądanie.";
}
