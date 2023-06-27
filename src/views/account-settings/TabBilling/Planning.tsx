// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Alert, AlertTitle, Chip, LinearProgress, Stack } from '@mui/material'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const Planning = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  return (
    <form>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <Typography variant='h6'>Current Plan</Typography>
        </Box>
        <Grid container spacing={7}>
          {/* <Grid item xs={12}></Grid> */}
          <Grid item xs={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Stack spacing={4}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Your Current Plan is Basic</Typography>
                <Typography variant='body2'>A simple start for everyone</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Active until Dec 09, 2021</Typography>
                <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
              </Box>
              <Box>
                <Stack direction='row' spacing={3} alignItems={'center'}>
                  <Typography sx={{ fontWeight: 600 }}>$199 Per Month</Typography>
                  <Chip
                    label='Current Plan'
                    color='primary'
                    sx={{ height: 30, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
                  />
                </Stack>
                <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
              </Box>
            </Stack>
            <Box sx={{ mt: 11 }}>
              <Button variant='contained' sx={{ marginRight: 3.5 }}>
                Upgrade Plan
              </Button>
              <Button
                type='reset'
                variant='outlined'
                color='secondary'
                onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
              >
                Cancel Subcription
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Alert severity='warning' sx={{ mb: 3 }}>
              <AlertTitle>We need your attention!</AlertTitle>
              Your plan requires update
            </Alert>
            <Stack spacing={2}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Days
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  24 of 30 days
                </Typography>
              </Stack>
              <LinearProgress color='primary' value={80} variant='determinate' />
              <Typography variant='body2'>6 days remaining until your plan requires update</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </form>
  )
}
export default Planning
