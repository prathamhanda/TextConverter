# Text Converter with UPI Payment

A web application that converts user-provided text to uppercase, sends a link via email, and includes a UPI payment option that accepts Indian UPI payments.

<img src="https://raw.githubusercontent.com/prathamhanda/TextConverter/refs/heads/main/yoyo.png">

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

## **4. Live Link**

Link: [TEXT CONVERTER](https://text007.netlify.app/)  


---
## **5. Screenshot of the Interface**

<p align="center" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">

  <img src="https://github.com/prathamhanda/TextConverter/blob/main/home%20page.png?raw=true" width="45%" height="260px" style="object-fit: cover; margin-right: 10px;" />
  <img src="https://github.com/prathamhanda/TextConverter/blob/main/success.png?raw=true" width="45%" height="260px" style="object-fit: cover;" />

</p>

### Prerequisites

- Node.js (v14+)
- npm or yarn
- A Gmail account for sending emails
- Your UPI ID for receiving payments
