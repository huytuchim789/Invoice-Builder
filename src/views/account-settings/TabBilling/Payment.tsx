import 'react-credit-cards-2/dist/es/styles-compiled.css'

// ** React Imports
import { useState, ChangeEvent } from 'react'
import Cards, { Focused } from 'react-credit-cards-2'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

// ** Icons Imports
import { LoadingButton } from '@mui/lab'
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from 'src/@core/utils/common'
import { styled } from '@mui/material'
import { getFullYearByLastTwoDigits } from './utils'
import { addPayment, detachCard } from 'src/@core/utils/api/payment'
import useCardInfo from 'src/@core/hooks/payment/useCardInfo'
import { globalStore } from 'src/@core/hocs/global-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { ICardInfo, ICardProps } from 'src/@core/models/api/payment/card.interface'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'

const CardStyled = styled('div')(() => ({
  '.rccs': {
    paddingTop: 10,
    margin: 0
  }
}))

interface FormState {
  number: string
  expiry: string
  cvc: string
  name: string
  focus: Focused | undefined
}

const Payment = () => {
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<FormState>({
    values: { number: '', expiry: '', cvc: '', name: '', focus: 'number' }
  })

  const cardInfo = useCardInfo()
  const { user } = globalStore((state: any) => state.userStore)
  const snackbar = useSnackbarWithContext()

  const [paymentState, setPaymentState] = useState<FormState>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: ''
  })

  const handleChangeField = (props: 'number' | 'expiry' | 'cvc' | 'name') => (event: ChangeEvent<HTMLInputElement>) => {
    if (props === 'expiry') {
      setPaymentState(prev => ({ ...prev, [`${props}`]: formatExpirationDate(event.target.value) }))
    } else if (props === 'number') {
      setPaymentState(prev => ({ ...prev, [`${props}`]: formatCreditCardNumber(event.target.value) }))
    } else if (props === 'cvc') {
      setPaymentState(prev => ({ ...prev, [`${props}`]: formatCVC(event.target.value, { number: 3 }) }))
    } else {
      setPaymentState(prev => ({ ...prev, [`${props}`]: event.target.value }))
    }
  }

  const addCard = useMutation({
    mutationFn: async (payment: ICardProps) => await addPayment(payment),
    onSuccess: (data: ICardInfo) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.CARD_INFO])
      snackbar.success(data.message)
    },
    onError: (err: { message: string }) => {
      snackbar.error(err.message)
    }
  })

  const detachCardMutate = useMutation({
    mutationFn: async () => await detachCard(),
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.CARD_INFO])
      snackbar.success(data.message)
    },
    onError: (err: { message: string }) => {
      snackbar.error(err.message)
    }
  })

  const onSubmit: SubmitHandler<FormState> = async data => {
    const newData: ICardProps = {
      type: 'card',
      details: {
        number: data.number,
        ...getFullYearByLastTwoDigits(data.expiry),
        cvc: data.cvc
      }
    }

    addCard.mutate(newData)
  }

  const handleFocusCard = (props: 'number' | 'expiry' | 'cvc' | 'name') => () => {
    setPaymentState(prev => ({ ...prev, focus: props }))
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
              <Typography variant='h6'>Payment Method</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant='h6'>Card</Typography>
            <CardStyled>
              <Cards
                number={paymentState.number}
                expiry={paymentState.expiry}
                cvc={paymentState.cvc}
                name={paymentState.name}
                focused={paymentState.focus}
              />
            </CardStyled>
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12}>
                <TextField
                  {...register('number', { required: true })}
                  fullWidth
                  label='Card Number'
                  placeholder='**** **** **** ****'
                  error={!!errors?.number}
                  value={paymentState.number}
                  inputProps={{
                    pattern: '[d| ]{16,22}'
                  }}
                  helperText={errors?.name ? 'Name is required' : null}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeField('number')}
                  onFocus={handleFocusCard('number')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('name', { required: true })}
                  label='Name'
                  placeholder='PHAM NGOC MAI LAM'
                  value={paymentState.name}
                  onChange={handleChangeField('name')}
                  onFocus={handleFocusCard('name')}
                  error={!!errors?.expiry}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                  helperText={errors?.expiry ? 'Name is required' : null}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  {...register('expiry', { required: true })}
                  fullWidth
                  label='Expiry'
                  placeholder='MM/DD'
                  value={paymentState.expiry}
                  // inputProps={{ pattern: 'mm/yy' }}
                  error={!!errors?.expiry}
                  onChange={handleChangeField('expiry')}
                  onFocus={handleFocusCard('expiry')}
                  helperText={errors?.expiry ? 'Expiry is required' : null}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  {...register('cvc', { required: true })}
                  fullWidth
                  label='CVC'
                  placeholder='123'
                  value={paymentState.cvc}
                  // inputProps={{ pattern: 'd{3,4}' }}
                  error={!!errors?.expiry}
                  onChange={handleChangeField('cvc')}
                  onFocus={handleFocusCard('cvc')}
                  helperText={errors?.expiry ? 'CVC is required' : null}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant='h6'>My Card</Typography>
            {cardInfo.isLoading ? (
              <Typography>Loading</Typography>
            ) : !cardInfo.data || cardInfo.isError || !user ? (
              <Typography>No Card</Typography>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(58, 53, 65, 0.04)',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}
              >
                <Box>
                  <img src='/images/cards/mastercard.png' alt='Card Image' />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '10px' }}>
                    <Typography variant='h6'>{user.name}</Typography>
                    <Box
                      sx={{
                        padding: '3px 5px',
                        borderRadius: '100px',
                        backgroundColor: '#ebe3f9'
                      }}
                    >
                      <Typography sx={{ color: 'rgb(145, 85, 253)' }}>Primary</Typography>
                    </Box>
                  </Box>
                  <Typography>**** **** **** {cardInfo.data?.card.last4}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                  }}
                >
                  <LoadingButton
                    loading={detachCardMutate.isLoading}
                    size='large'
                    variant='outlined'
                    color='error'
                    onClick={() => detachCardMutate.mutate()}
                  >
                    Delete
                  </LoadingButton>
                  <Typography textAlign='right'>
                    Card expires at {cardInfo.data?.card.exp_month}/{String(cardInfo.data?.card.exp_year).slice(2, 4)}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12}>
            <LoadingButton loading={addCard.isLoading} variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Save Changes
            </LoadingButton>
            <Button onClick={() => reset()} variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default Payment
