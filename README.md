# Text Converter with UPI Payment

A web application that converts user-provided text to uppercase, sends a link via email, and includes a UPI payment option that accepts Indian UPI payments.

## Features

- React.js frontend with animations (using Material-UI and Framer Motion)
- Node.js + Express backend
- Email sending functionality using Nodemailer
- UPI deep linking for payment (works on mobile devices)
- QR code generation for desktop users
- JWT-based secure links
- Mobile responsive design

## Project Structure

```
project/
├── client/             # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── PaymentPage.jsx
│   │   │   └── SuccessPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
├── server/             # Node.js backend
│   ├── index.js        # Express server
│   ├── .env            # Environment variables
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- A Gmail account for sending emails
- Your UPI ID for receiving payments

### Environment Setup

1. In the `server` directory, update the `.env` file with your credentials:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
UPI_ID=your_upi_id@provider
CLIENT_URL=http://localhost:5173
```

2. In the `client/src/components/PaymentPage.jsx` file, replace `your_upi_id@provider` with your actual UPI ID.

### Installation & Running

#### Backend (Server)

```bash
cd server
npm install
npm run dev
```

The server will start on http://localhost:5000

#### Frontend (Client)

```bash
cd client
npm install
npm run dev
```

The client will start on http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Enter the text you want to convert to uppercase
3. Enter your email address
4. Click the "Convert & Send" button
5. Check your email for the conversion link
6. Click the link in the email to view your converted text
7. Choose to make a payment (optional) to support the service
8. Complete the payment via UPI:
   - On mobile: You'll be redirected to your UPI app
   - On desktop: Scan the QR code with your UPI app

## How UPI Payments Work

The application uses UPI deep linking to generate payment links:
- For mobile users, tapping the payment button opens their UPI app directly
- For desktop users, a QR code is displayed that can be scanned with any UPI app (Google Pay, PhonePe, Paytm, etc.)
- The link format is: `upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=TRANSACTION_NOTE`
- No API keys or external payment gateway is required

## Notes for Production

- Secure your JWT secret
- Set up proper email authentication
- Use environment variables for sensitive information
- Configure CORS properly
- Use HTTPS in production
- Add proper error handling and logging 