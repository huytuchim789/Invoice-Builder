// ** React Imports
import { useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Alert, AlertTitle, Chip, LinearProgress, Stack } from '@mui/material'
import PlansModal, { PLAN_TYPE } from '../Modals/PlansModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unSubcribeProPlan } from 'src/@core/utils/api/payment'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { LoadingButton } from '@mui/lab'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { ISubscriptionResponse } from 'src/@core/models/api/payment/subscription.interface'
import { MONTH_DATE, calculateDaysLeft, timestampzToDate } from './utils'
import moment from 'moment'

const Planning = () => {
  // ** States
  const queryClient = useQueryClient()
  const checkSub: ISubscriptionResponse | undefined = queryClient.getQueryData([QUERY_INVOICE_KEYS.CHECK_SUBCRIBE])
  const daysLeft = calculateDaysLeft(checkSub?.data?.trial_ends_at)
  const currentPlan = useMemo(() => {
    if (!checkSub?.data || checkSub?.data?.stripe_status === 'canceled') {
      return PLAN_TYPE.NO_PLAN
    }
    if (checkSub?.data?.stripe_status === 'trialing') {
      return PLAN_TYPE.TRIAL_PLAN
    } else if (checkSub?.data?.stripe_status === 'active') {
      return PLAN_TYPE.BASIC_PLAN
    }
  }, [checkSub])
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
  const getCurrentPlan = () => {
    switch (currentPlan) {
      case PLAN_TYPE.NO_PLAN:
        return 'Your Current Plan is not Active'
      case PLAN_TYPE.TRIAL_PLAN:
        return 'Your Current Plan is Trial'
      case PLAN_TYPE.BASIC_PLAN:
        return 'Your Current Plan is Basic'
      default:
        return ''
    }
  }
  const activeDate = useMemo(() => {
    return currentPlan === PLAN_TYPE.TRIAL_PLAN
      ? timestampzToDate(checkSub?.data?.trial_ends_at)
      : timestampzToDate(moment(checkSub?.data?.created_at).add('1', 'month').toISOString())
  }, [currentPlan])
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
                <Typography sx={{ fontWeight: 600 }}>{getCurrentPlan()}</Typography>
                <Typography variant='body2'>A simple start for everyone</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {currentPlan === PLAN_TYPE.NO_PLAN
                    ? `Subscribe right now for only 40$ per month`
                    : `Active until ${activeDate}`}
                </Typography>
                <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
              </Box>
              {currentPlan === PLAN_TYPE.BASIC_PLAN && (
                <Box>
                  <Stack direction='row' spacing={3} alignItems={'center'}>
                    <Typography sx={{ fontWeight: 600 }}>$40 Per Month</Typography>
                    <Chip
                      label='Current Plan'
                      color='primary'
                      sx={{ height: 30, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
                    />
                  </Stack>
                  <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
                </Box>
              )}
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
            {currentPlan === PLAN_TYPE.TRIAL_PLAN && (
              <>
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
                      {`${MONTH_DATE - daysLeft} of 30 days`}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    color='primary'
                    value={((MONTH_DATE - daysLeft) / MONTH_DATE) * 100}
                    variant='determinate'
                  />
                  <Typography variant='body2'>{`${daysLeft} days remaining until your plan requires update`}</Typography>
                </Stack>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <PlansModal isOpenModal={isOpenPlansModal} handleClose={() => setIsOpenPlanModal(false)} />
    </form>
  )
}
export default Planning
