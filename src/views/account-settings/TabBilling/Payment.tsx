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
import { useForm } from 'react-hook-form'
// ** Icons Imports
import { useSettingController } from './../controller'
import { useSettingStore } from './../store'
import { LoadingButton } from '@mui/lab'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from 'src/@core/utils/common'
import { styled } from '@mui/material'

const CardStyled = styled('div')(() => ({
  '.rccs': {
    paddingTop: 10,
    margin: 0
  }
}))

const Payment = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm({
    values: { number: '', expiry: '', cvc: '', name: '' }
  })

  const [paymentState, setPaymentState] = useState<{
    number: string
    expiry: string
    cvc: string
    name: string
    focus: Focused | undefined
  }>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: ''
  })

  // ** State
  const settingController = useSettingController()
  const { loading } = useSettingStore()

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

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleFocusCard = (props: 'number' | 'expiry' | 'cvc' | 'name') => () => {
    setPaymentState(prev => ({ ...prev, focus: props }))
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
              <Typography variant='h6'>Payment Method</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  inputProps={{ pattern: 'dd/dd' }}
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
                  inputProps={{ pattern: 'd{3,4}' }}
                  error={!!errors?.expiry}
                  onChange={handleChangeField('cvc')}
                  onFocus={handleFocusCard('cvc')}
                  helperText={errors?.expiry ? 'CVC is required' : null}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6'>My Card</Typography>
            <Box></Box>
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
            <LoadingButton loading={loading} variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
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
