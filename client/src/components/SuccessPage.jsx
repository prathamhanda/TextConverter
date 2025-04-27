import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  SvgIcon,
  useTheme,
  Paper,
  Divider,
  Grid
} from '@mui/material'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import HomeIcon from '@mui/icons-material/Home'

// Simple checkmark icon
const CheckmarkIcon = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
    />
  </SvgIcon>
)

// Animation components with Framer Motion
const MotionBox = motion(Box)
const MotionTypography = motion(Typography)
const MotionPaper = motion(Paper)

const SuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const iconColor = theme.palette.success.main
  
  // Get text data from location state
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0)
  
  useEffect(() => {
    // Get data from location state or redirect to home if it doesn't exist
    if (location.state?.text) {
      setText(location.state.text)
      setEmail(location.state.email || '')
      setAmount(location.state.amount || 0)
    } else {
      navigate('/')
    }
  }, [location, navigate])
  
  // Function to download text as a file
  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([text], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'converted_text.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack spacing={4} alignItems="center">
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.6 
          }}
          sx={{ mb: 3 }}
        >
          <SvgIcon 
            component={CheckmarkIcon} 
            sx={{ 
              fontSize: 120,
              color: iconColor,
              animation: 'pulse 2s ease-in-out infinite'
            }}
            className="animate-pulse"
          />
        </MotionBox>
        
        <MotionTypography
          variant="h3"
          component="h1"
          align="center"
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(45deg, #22C55E 30%, #4299E1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {amount > 0 ? 'Payment Successful!' : 'Conversion Completed!'}
        </MotionTypography>
        
        <MotionTypography
          variant="h6"
          align="center"
          color="text.secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {amount > 0 
            ? `Thank you for your payment of ₹${amount}.` 
            : 'Your text has been successfully converted.'}
        </MotionTypography>
        
        {amount > 0 && (
          <MotionTypography
            variant="body1"
            align="center"
            color="text.secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            sx={{ maxWidth: 500 }}
          >
            Your payment has been processed successfully. We appreciate your contribution!
          </MotionTypography>
        )}
        
        {/* Display the converted text */}
        <MotionPaper
          elevation={3}
          sx={{ p: 3, width: '100%', mb: 2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
            Converted Text Result
          </Typography>
          {email && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Email: {email}
            </Typography>
          )}
          
          <Divider sx={{ my: 2 }} />
          
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
              overflowX: 'auto',
              maxHeight: '300px',
              overflowY: 'auto'
            }}
          >
            {text}
          </Box>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ mt: 2 }}
          >
            Download as Text File
          </Button>
        </MotionPaper>
        
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{ 
                  fontWeight: 'bold',
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 5,
                  }
                }}
              >
                Convert Another Text
              </Button>
            </Grid>
          </Grid>
        </MotionBox>

        <Box textAlign="center" sx={{ opacity: 0.8, mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Text Converter. All rights reserved.
          </Typography>
        </Box>
      </Stack>
    </Container>
  )
}

export default SuccessPage 