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
