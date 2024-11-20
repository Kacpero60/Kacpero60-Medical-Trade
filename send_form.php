<?php

require __DIR__ . '/vendor/autoload.php'; // Ładowanie autoloadera Composer

// Sprawdź, czy klasa PHPMailer jest załadowana
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    die("Błąd: Klasa PHPMailer nie została załadowana!");
}

// Sprawdź, czy plik .env istnieje
if (!file_exists(__DIR__ . '/.env')) {
    die("Plik .env nie został znaleziony!");
}

// Ładowanie danych z pliku .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Debugowanie zmiennych środowiskowych
echo "<h3>Debugowanie zmiennych .env:</h3>";
echo "SMTP_HOST: " . getenv('SMTP_HOST') . "<br>";
echo "SMTP_PORT: " . getenv('SMTP_PORT') . "<br>";
echo "SMTP_USER: " . getenv('SMTP_USER') . "<br>";
echo "EMAIL_USER: " . getenv('EMAIL_USER') . "<br>";

// Sprawdź, czy kluczowe zmienne środowiskowe zostały załadowane
if (empty(getenv('SMTP_HOST')) || empty(getenv('SMTP_PORT')) || empty(getenv('SMTP_USER')) || empty(getenv('EMAIL_USER'))) {
    die("Brak wymaganych zmiennych w pliku .env. Sprawdź konfigurację.");
}

// Pobierz dane z formularza
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $companyName = htmlspecialchars($_POST['company']);
    $email = htmlspecialchars($_POST['email']); // E-mail użytkownika (nadawca)
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
    $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_SERVER; // Szczegóły komunikacji
    $mail->Debugoutput = 'html'; // Format debugowania

    try {
        // Ustawienia serwera SMTP
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST'); // Host SMTP
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USER'); // Adres do logowania SMTP
        $mail->Password = getenv('SMTP_PASS'); // Hasło do logowania SMTP
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; // Szyfrowanie TLS
        $mail->Port = getenv('SMTP_PORT'); // Port SMTP

        // Ustawienie nadawcy jako użytkownika wypełniającego formularz
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("Nieprawidłowy adres e-mail nadawcy: $email");
        }
        $mail->setFrom($email, $companyName); // Nadawca: e-mail i nazwa firmy użytkownika

        // Stały odbiorca: office@jasema.pl
        $mail->addAddress(getenv('EMAIL_USER')); // Adres odbiorcy

        // Debugowanie adresu odbiorcy
        if (!filter_var(getenv('EMAIL_USER'), FILTER_VALIDATE_EMAIL)) {
            die("Nieprawidłowy adres e-mail odbiorcy: " . getenv('EMAIL_USER'));
        }

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
