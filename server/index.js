const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate JWT token
const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Routes
app.post('/api/convert', async (req, res) => {
  try {
    const { text, email } = req.body;
    
    if (!text || !email) {
      return res.status(400).json({ error: 'Text and email are required' });
    }
    
    // Convert text to uppercase
    const upperCaseText = text.toUpperCase();
    
    // Generate token with the data
    const token = generateToken({ text: upperCaseText, email });
    
    // Payment link
    const paymentLink = `${process.env.CLIENT_URL}/payment/${token}`;
    
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Text Conversion Result',
      html: `
        <h1>Click the link below to view your result and make a payment:</h1>
        <a href="${paymentLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">View Result & Pay</a>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      paymentLink
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/verify/:token', (req, res) => {
  const { token } = req.params;
  
  const data = verifyToken(token);
  
  if (!data) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
  
  res.status(200).json({ 
    success: true, 
    data: {
      text: data.text,
      email: data.email
    }
  });
});

app.post('/api/payment/success', (req, res) => {
  try {
    // This endpoint can be used to record successful payments if needed
    // For UPI deep linking, the payment happens outside our application
    // so we don't need to verify the payment like with Razorpay
    
    res.status(200).json({
      success: true,
      message: 'Payment record created',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get UPI payment link
app.post('/api/payment/upi-link', (req, res) => {
  try {
    const { amount, upiId, name } = req.body;
    
    if (!upiId) {
      return res.status(400).json({ error: 'UPI ID is required' });
    }
    
    // Generate UPI deep link
    // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=TRANSACTION_NOTE
    const paymentLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name || 'Text Converter')}&am=${amount || ''}&cu=INR&tn=${encodeURIComponent('Payment for Text Conversion')}`;
    
    res.status(200).json({
      success: true,
      paymentLink,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 