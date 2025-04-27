import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  SvgIcon,
  useTheme
} from '@mui/material'
import { motion } from 'framer-motion'

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

const SuccessPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const iconColor = theme.palette.success.main
  
  // Confetti animation
  const confettiVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
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
          Payment Successful!
        </MotionTypography>
        
        <MotionTypography
          variant="h6"
          align="center"
          color="text.secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Thank you for supporting our service.
        </MotionTypography>
        
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
        
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
            sx={{ 
              mt: 3, 
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
        </MotionBox>
        
        {/* Confetti Elements */}
        <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden" sx={{ pointerEvents: 'none' }}>
          {[...Array(20)].map((_, i) => (
            <MotionBox
              key={i}
              position="absolute"
              sx={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                borderRadius: '50%',
                bgcolor: [
                  theme.palette.success.main,
                  theme.palette.primary.main,
                  theme.palette.secondary.main,
                  theme.palette.warning.main,
                  theme.palette.info.main
                ][Math.floor(Math.random() * 5)],
                zIndex: -1,
              }}
              initial="hidden"
              animate="visible"
              variants={confettiVariants}
              transition={{
                delay: Math.random() * 0.5,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </Box>

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