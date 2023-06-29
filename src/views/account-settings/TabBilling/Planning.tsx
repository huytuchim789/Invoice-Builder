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
import PlansModal from '../Modals/PlansModal'
import { useMutation } from '@tanstack/react-query'
import { unSubcribeProPlan } from 'src/@core/utils/api/payment'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { LoadingButton } from '@mui/lab'



const Planning = () => {
  // ** States
 
  const snackbar = useSnackbarWithContext()

  const [isOpenPlansModal, setIsOpenPlanModal] = useState<boolean>(false)
  const unSubcribePlan = useMutation({
    mutationFn: async () => await unSubcribeProPlan(),
    onSuccess: (data: { message: string }) => {
      snackbar.success(data.message)
    },
    onError: (err: { message: string }) => {
      snackbar.error(err.message)
    }
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
              <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => setIsOpenPlanModal(true)}>
                Upgrade Plan
              </Button>
              <LoadingButton
                loading={unSubcribePlan.isLoading}
                variant='outlined'
                color='secondary'
                onClick={() => unSubcribePlan.mutate()}
              >
                Cancel Subcription
              </LoadingButton>
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
      <PlansModal isOpenModal={isOpenPlansModal} handleClose={() => setIsOpenPlanModal(false)} />
    </form>
  )
}
export default Planning
