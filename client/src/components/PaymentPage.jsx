import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  Grid,
  Paper,
  Divider,
  Chip,
  Alert,
  AlertTitle,
  CircularProgress,
  Skeleton,
  Snackbar,
  ButtonGroup,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import axios from 'axios'

// Animation components with Framer Motion
const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

const PaymentPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [upiId, setUpiId] = useState('prathamhanda10@okhdfcbank') // Replace with your UPI ID
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [upiLink, setUpiLink] = useState('')
  
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://textconverter.onrender.com/api/verify/${token}`)
        setData(response.data.data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Invalid or expired link. Please request a new conversion.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [token])
  
  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setAmount(value)
  }
  
  const initiatePayment = async () => {
    setPaymentLoading(true)
    
    try {
      // Generate UPI payment link
      const response = await axios.post('https://textconverter.onrender.com/api/payment/upi-link', {
        amount,
        upiId,
        name: 'Text Converter'
      })
      
      const paymentLink = response.data.paymentLink
      setUpiLink(paymentLink)
      
      // For mobile, directly open the UPI app
      if (isMobile) {
        window.location.href = paymentLink
      } else {
        // For desktop, show QR code dialog
        setQrDialogOpen(true)
      }
      
      // Record the payment attempt
      await axios.post('https://textconverter.onrender.com/api/payment/success', {
        amount,
        email: data?.email
      })
      
    } catch (error) {
      console.error('Payment initiation error:', error)
      setSnackbar({
        open: true,
        message: 'Could not generate payment link',
        severity: 'error'
      })
    } finally {
      setPaymentLoading(false)
    }
  }
  
  const handlePaymentSuccess = () => {
    setQrDialogOpen(false)
    navigate('/success')
  }
  
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={40} width="80%" sx={{ mx: 'auto' }} />
          <Skeleton variant="rectangular" height={20} width="60%" sx={{ mx: 'auto' }} />
          <Skeleton variant="rectangular" height={200} width="100%" />
          <Skeleton variant="rectangular" height={60} width="40%" sx={{ mx: 'auto' }} />
        </Stack>
      </Container>
    )
  }
  
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Alert
          severity="error"
          variant="filled"
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center', 
            py: 4,
            borderRadius: 2
          }}
        >
          <AlertTitle sx={{ fontSize: '1.25rem', mb: 2 }}>Error!</AlertTitle>
          <Typography sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Go Back Home
          </Button>
        </Alert>
      </Container>
    )
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionTypography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(45deg, #319795 30%, #4299E1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Your Text Conversion Result
        </MotionTypography>
        
        <MotionTypography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          The text has been successfully converted to uppercase
        </MotionTypography>
        
        <Paper 
          elevation={3} 
          sx={{ p: 3, mb: 4 }}
          className="animate-fadeIn delay-200"
        >
          <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
            Original Request
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Email: {data?.email}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
            Converted Result
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.200',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              mb: 2,
              overflowX: 'auto'
            }}
          >
            {data?.text}
          </Box>
        </Paper>
        
        <Paper 
          elevation={3} 
          sx={{ p: 3, mb: 4 }}
          className="animate-fadeIn delay-300"
        >
          <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
            Support Our Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We hope you found this service useful! If you'd like to support us, you can make a 
            payment of any amount, even ₹0.
          </Typography>
          
          <Stack spacing={3}>
            <TextField
              label="Amount (₹)"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              InputProps={{
                endAdornment: <Chip label="INR" color="success" size="small" />
              }}
              fullWidth
              variant="outlined"
              inputProps={{ min: 0 }}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setAmount(0)}
                  fullWidth
                >
                  ₹0
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setAmount(10)}
                  fullWidth
                >
                  ₹10
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setAmount(50)}
                  fullWidth
                >
                  ₹50
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setAmount(100)}
                  fullWidth
                >
                  ₹100
                </Button>
              </Grid>
            </Grid>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={initiatePayment}
              disabled={paymentLoading}
              className="animate-pulse"
              sx={{ 
                py: 1.5,
                fontSize: '1rem',
                mt: 2
              }}
            >
              {paymentLoading ? 
                <CircularProgress size={24} color="inherit" /> : 
                `Pay with UPI ₹${amount}`
              }
            </Button>
            
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              {isMobile ? 
                "You'll be redirected to your UPI app to complete payment" : 
                "A QR code will be displayed for payment"}
            </Typography>
          </Stack>
        </Paper>
        
        <Divider sx={{ my: 4 }} />
        
        <Box textAlign="center" sx={{ opacity: 0.8, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Text Converter. All rights reserved.
          </Typography>
        </Box>
      </MotionBox>
      
      {/* QR Code Dialog for Desktop */}
      <Dialog 
        open={qrDialogOpen} 
        onClose={() => setQrDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" align="center" fontWeight="bold">
            Scan QR Code to Pay
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <Box sx={{ border: '1px solid', borderColor: 'grey.300', p: 3, borderRadius: 2, mb: 3 }}>
              <QRCodeSVG value={upiLink} size={256} />
            </Box>
            <Typography variant="body1" align="center" gutterBottom>
              Amount: ₹{amount}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => setQrDialogOpen(false)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handlePaymentSuccess}
          >
            I've Completed Payment
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default PaymentPage 