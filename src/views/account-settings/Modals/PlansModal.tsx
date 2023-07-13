import { LoadingButton } from '@mui/lab'
import { Box, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import useCheckSubcribe from 'src/@core/hooks/payment/useCheckSubcribe'
import { subcribeProPlan, unSubcribeProPlan } from 'src/@core/utils/api/payment'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

interface Props {
  isOpenModal: boolean
  handleClose: () => void
}
export enum PLAN_TYPE {
  NO_PLAN = 'no_plan',
  TRIAL_PLAN = 'trial_plan',
  BASIC_PLAN = 'basic_plan'
}
const CircleIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      aria-hidden='true'
      role='img'
      fontSize='0.75rem'
      className='iconify iconify--mdi'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z'
      ></path>
    </svg>
  )
}

const PlansModal = ({ isOpenModal, handleClose }: Props) => {
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()

  const checkSub = useCheckSubcribe()

  const subcribe = useMutation({
    mutationFn: async () => await subcribeProPlan(),
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.CHECK_SUBCRIBE])
      snackbar.success(data.message)
    },
    onError: (err: { message: string }) => {
      snackbar.error(err.message)
    }
  })

  const unSubcribe = useMutation({
    mutationFn: async () => await unSubcribeProPlan(),
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.CHECK_SUBCRIBE])
      snackbar.success(data.message)
    },
    onError: (err: { message: string }) => {
      snackbar.error(err.message)
    }
  })
  const currentPlan = useMemo(() => {
    if (!checkSub?.data?.data || checkSub?.data?.data?.stripe_status === 'canceled') {
      return PLAN_TYPE.NO_PLAN
    }
    if (checkSub?.data?.data?.stripe_status === 'trialing') {
      return PLAN_TYPE.TRIAL_PLAN
    } else if (checkSub?.data?.data?.stripe_status === 'active') {
      return PLAN_TYPE.BASIC_PLAN
    }
  }, [checkSub])
  return (
    <Dialog open={isOpenModal} onClose={handleClose} maxWidth='lg'>
      <Box padding={3}>
        <DialogTitle textAlign='center'>Find the right plan for your site</DialogTitle>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
          Get started with us - it's perfect for individuals and teams. Choose a subscription plan that meets your
          needs.
        </Typography>
        <DialogContent>
          <Grid container justifyContent={'space-between'}>
            <Grid
              item
              xs={12}
              lg={5.5}
              sx={{ border: '1px solid rgba(145, 85, 253, 0.5)', padding: '20px', borderRadius: '8px' }}
            >
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='10px'>
                <img width={34} src='/images/cards/plan-pro.png' alt='Plan Pro' />
                <Typography fontSize={20}>Trial</Typography>
                <Typography fontSize={14}>Try for 30 days</Typography>
              </Box>
              <Box width='100%' display='flex' flexDirection='column' gap='10px' mt='20px'>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircleIcon />
                  <Typography>Invoice management</Typography>
                </Box>
              </Box>
              {currentPlan === PLAN_TYPE.TRIAL_PLAN ? (
                <LoadingButton
                  loading={unSubcribe.isLoading || checkSub.isFetching}
                  variant='outlined'
                  fullWidth
                  sx={{ mt: '20px' }}
                  // onClick={() => unSubcribe.mutate()}
                >
                  Your current plan
                </LoadingButton>
              ) : (
                <LoadingButton
                  loading={subcribe.isLoading || checkSub.isFetching}
                  variant='contained'
                  fullWidth
                  sx={{ mt: '20px' }}
                  onClick={() => subcribe.mutate()}
                >
                  Upgrade
                </LoadingButton>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              lg={5.5}
              sx={{ border: '1px solid rgba(145, 85, 253, 0.5)', padding: '20px', borderRadius: '8px' }}
            >
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='10px'>
                <img width={34} src='/images/cards/plan-pro.png' alt='Plan Pro' />
                <Typography fontSize={20}>Standard</Typography>
                <Typography fontSize={14}>For small to medium businesses</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{
                      margin: '0.4rem 0px 0px',
                      lineHeight: 1.5,
                      letterSpacing: '0.15px',
                      fontSize: '0.875rem',
                      color: 'rgba(58, 53, 65, 0.6)',
                      fontWeight: 600,
                      alignSelf: 'flex-start'
                    }}
                  >
                    $
                  </Typography>
                  <Typography variant='h3' sx={{ color: 'rgb(145, 85, 2' }}>
                    40
                  </Typography>
                  <Typography
                    sx={{
                      margin: '0px 0px 0.4rem',
                      lineHeight: 1.5,
                      letterSpacing: '0.15px',
                      fontSize: '0.875rem',
                      color: 'rgba(58, 53, 65, 0.6)',
                      fontWeight: 600,
                      alignSelf: 'flex-end'
                    }}
                  >
                    /month
                  </Typography>
                </Box>
                <Typography>USD 480/year</Typography>
              </Box>
              <Box width='100%' display='flex' flexDirection='column' gap='10px' mt='20px'>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircleIcon />
                  <Typography>Unlimited responses</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircleIcon />
                  <Typography>Unlimited forms and surveys</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircleIcon />
                  <Typography>Unlimited responses</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircleIcon />
                  <Typography>Instagram profile page</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircleIcon />
                  <Typography>Unlimited responses</Typography>
                </Box>
              </Box>
              {currentPlan === PLAN_TYPE.BASIC_PLAN ? (
                <LoadingButton
                  loading={unSubcribe.isLoading || checkSub.isFetching}
                  variant='contained'
                  fullWidth
                  sx={{ mt: '20px' }}
                  // onClick={() => unSubcribe.mutate()}
                >
                  Your current plan
                </LoadingButton>
              ) : (
                <LoadingButton
                  loading={subcribe.isLoading || checkSub.isFetching}
                  variant='contained'
                  fullWidth
                  sx={{ mt: '20px' }}
                  onClick={() => subcribe.mutate()}
                >
                  Upgrade
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default PlansModal
