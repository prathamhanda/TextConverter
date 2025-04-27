import { useState } from 'react'
import { 
  Box, 
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  Paper,
  Divider,
  Avatar,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'
import { motion } from 'framer-motion'
import axios from 'axios'

// Animation components with Framer Motion
const MotionBox = motion(Box)
const MotionTypography = motion(Typography)
const MotionGrid = motion(Grid)

const HomePage = () => {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  const theme = useTheme()

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!text.trim() || !email.trim()) {
      setSnackbar({
        open: true,
        message: 'Please provide both text and email',
        severity: 'error'
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await axios.post('http://localhost:5000/api/convert', {
        text,
        email
      })
      
      setSnackbar({
        open: true,
        message: 'Check your email for the converted text link',
        severity: 'success'
      })
      
      // Reset form
      setText('')
      setEmail('')
    } catch (error) {
      console.error('Error:', error)
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Something went wrong',
        severity: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionTypography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: 800, 
            background: 'linear-gradient(45deg, #319795 30%, #4299E1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Text Converter
        </MotionTypography>
        
        <MotionTypography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Convert your text to UPPERCASE and receive it via email
        </MotionTypography>
        
        <MotionGrid
          container
          spacing={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                animation: 'float 4s ease-in-out infinite' 
              }}
              className="animate-float"
            >
              <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                How it works
              </Typography>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 28, 
                      height: 28, 
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    1
                  </Avatar>
                  <Typography>Enter your text in the box</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 28, 
                      height: 28, 
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    2
                  </Avatar>
                  <Typography>Provide your email address</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 28, 
                      height: 28, 
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    3
                  </Avatar>
                  <Typography>Receive the converted text link</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 28, 
                      height: 28, 
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    4
                  </Avatar>
                  <Typography>Support us with a payment (optional)</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ p: 3 }}
              component="form" 
              onSubmit={handleSubmit}
              className="animate-fadeIn delay-300"
            >
              <Stack spacing={3}>
                <TextField
                  label="Your Text"
                  placeholder="Type or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  multiline
                  rows={5}
                  fullWidth
                  required
                  variant="outlined"
                  helperText="We'll convert this to UPPERCASE"
                />
                
                <TextField
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  variant="outlined"
                  helperText="We'll send the conversion link here"
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  className="animate-pulse"
                  sx={{ 
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Convert & Send'}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </MotionGrid>
        
        <Divider sx={{ my: 5 }} />
        
        <Box textAlign="center" sx={{ opacity: 0.8, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Text Converter. All rights reserved.
          </Typography>
        </Box>
      </MotionBox>
      
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

export default HomePage 