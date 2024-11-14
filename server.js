require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', (req, res) => {
  const { companyName, email, zipCode, productName, referenceCode, quantity, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'office@jasema.pl',
    subject: `Nowa wiadomość od ${companyName}`,
    html: `
      <h3>Nowa wiadomość z formularza kontaktowego</h3>
      <p><strong>Firma:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Kod pocztowy:</strong> ${zipCode}</p>
      <p><strong>Nazwa produktu:</strong> ${productName}</p>
      <p><strong>Kod referencyjny:</strong> ${referenceCode}</p>
      <p><strong>Ilość:</strong> ${quantity}</p>
      <p><strong>Wiadomość:</strong> ${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Błąd przy wysyłaniu wiadomości:', error);
      return res.status(500).json({ status: 'error', message: 'Nie udało się wysłać wiadomości' });
    } else {
      console.log('Wiadomość wysłana:', info.response);
      return res.status(200).json({ status: 'success', message: 'Wiadomość została wysłana!' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
