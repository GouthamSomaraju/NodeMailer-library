# NodeMailer-library
Sending Mail through Node using NodeMailer library

# NodeMailer OTP Sending Example

This project demonstrates how to use the **NodeMailer** library to send emails with an OTP (One-Time Password) to users via **Gmail SMTP server**. It uses an **Express** server to handle the sending of OTP emails when a user sends a request.

## Project Overview

This application contains two main parts:

1. **mailer.js** - A module to configure and create the SMTP transport for sending emails.
2. **server.js** - The main Express server that listens for a POST request and sends the OTP to the provided email address.

---

## Code Explanation

### 1. `mailer.js` - SMTP Transport Configuration

```javascript
let mailer = require('nodemailer');
require('dotenv').config();
```
- **nodemailer** is imported to handle the email sending functionality.
- **dotenv** is imported to manage environment variables, such as your Gmail credentials, securely.

```javascript
let transfer = mailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
```
- The `createTransport()` method is used to create an SMTP transport for sending emails.
- `host` is set to `'smtp.gmail.com'`, the Gmail SMTP server.
- `secure: false` is set to allow insecure connections (for port 587).
- `port: 587` is the standard port used for sending emails securely.
- The `auth` field contains the `user` and `pass`, which are retrieved from the `.env` file via `process.env`.

```javascript
module.exports = transfer;
```
- The configured `transfer` object is exported to be used in other parts of the application.

---

### 2. `server.js` - Express Server and OTP Sending Logic

```javascript
let express = require('express');
let transfer = require('./mailer.js');
require('dotenv').config();
let app = express();
```
- **express** is imported to set up the Express server.
- **transfer** is imported from the `mailer.js` file, which contains the email transport configuration.
- **dotenv** is imported again to access environment variables in the server file.
- `app` is initialized as an Express application.

```javascript
app.use(express.json()); // Middleware to parse JSON body
```
- The `express.json()` middleware is used to parse the incoming JSON request body, which will contain the email address.

```javascript
app.post('/send-otp', (req, res) => {
    let email = req.body.email; // Email address where OTP will be sent
    let otp = '';
```
- A `POST` route is created at `/send-otp` that listens for a request containing an `email` field.
- The `email` variable is assigned the value from the request body.
- An empty string `otp` is initialized to generate a 4-digit OTP.

```javascript
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10);
    }
```
- A `for` loop generates a 4-digit OTP by appending a random digit (0-9) to the `otp` string.

```javascript
    let mailoptions = {
        from: process.env.USER, // Sender email
        to: email, // Recipient email
        subject: 'OTP From NodeMailer', // Email subject
        html: `
        <p>Hello, Your OTP is <h1 style="color: greenyellow;">${otp}</h1></p>
        `, // HTML body
        text: 'Verify your OTP', // Text body (fallback)
        attachments: [{
            filename: 'thankyou.jpeg', // Attachment file
            path: './thankyou.jpeg', // Path to the attachment file
            contentType: 'image/jpeg' // Attachment MIME type
        }]
    };
```
- `mailoptions` contains the configuration for the email that will be sent:
  - **from** is the sender's email, stored in `process.env.USER`.
  - **to** is the recipient's email, which was provided in the request body.
  - **subject** is the subject line of the email.
  - **html** contains the HTML content of the email, which includes the OTP displayed in a styled `<h1>` tag.
  - **text** provides a plain-text version of the email content, which will be displayed if the recipient's email client cannot render HTML.
  - **attachments** includes an image (`thankyou.jpeg`), which will be attached to the email.

```javascript
    transfer.sendMail(mailoptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            console.log(info);
            res.send('Mail Sent');
        }
    });
```
- The `sendMail()` method is called to send the email with the provided options.
- If an error occurs, it is logged to the console, and the response sent to the client is `'Error'`.
- If the email is sent successfully, the response `'Mail Sent'` is returned, and the result is logged to the console.

```javascript
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
- The server starts listening on port `3000`, and a log message is displayed to confirm the server is running.

---

## How to Use the Application

### 1. Install Dependencies

Run the following command in your terminal to install the required dependencies:

```bash
npm install nodemailer dotenv express
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of your project and add your Gmail credentials like this:

```text
USER=your-email@gmail.com
PASS=your-email-password
```

**Note:** Do not share your `.env` file publicly. It's essential to keep your credentials private.

### 3. Run the Server

Once the dependencies are installed and the `.env` file is configured, you can run the server with the following command:

```bash
node server.js
```

The server will be available at `http://localhost:3000`.

### 4. Send OTP via HTTP Request

Use **Postman** or any HTTP client to send a **POST** request to `http://localhost:3000/send-otp` with the following body:

```json
{
  "email": "recipient-email@example.com"
}
```

### 5. Check Email Inbox

The recipient should receive an email containing the OTP and a `thankyou.jpeg` attachment.

---

## Error Handling

If there are any issues sending the email (for example, incorrect credentials), the server will log the error to the console, and the client will receive an `"Error"` response.

Make sure to:
- Verify your Gmail credentials in the `.env` file.
- Allow **less secure apps** in your Gmail account settings, or use **App Passwords** if you have Two-Factor Authentication enabled.

---

## License

This project is open-source and available under the MIT License.

---

Feel free to ask if you have any further questions or need more help with NodeMailer!
```

### Explanation of the Document:
- **Introduction**: The purpose of the project is clearly stated at the top.
- **Project Overview**: A summary of the two core parts of the project (`mailer.js` and `server.js`).
- **Code Explanation**: Line-by-line comments help explain the functionality of each part of the code. This includes setting up the transport, generating OTP, and sending emails.
- **How to Use the Application**: Steps for setting up and running the application.
- **Error Handling**: Details on possible errors and how to fix them.
- **License**: States that the project is open-source under the MIT License.

This README file provides a comprehensive guide for anyone looking to understand, set up, and use the OTP email sending application.