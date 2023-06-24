// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'
import { useForm } from 'react-hook-form'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useSettingController } from './../controller'
import { useSettingStore } from './../store'
import { CircularProgress } from '@mui/material'
import { LoadingComponent } from 'src/@core/components/loading'
import { LoadingButton } from '@mui/lab'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const Payment = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [img, setImg] = useState<any>(null)
  const settingController = useSettingController()
  const { info, loading } = useSettingStore()
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: false
  })

  const handleInputChange = evt => {
    const { name, value } = evt.target

    setState(prev => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = evt => {
    setState(prev => ({ ...prev, focus: evt.target.name }))
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
    register
  } = useForm({
    values: { number: '', expiry: '', cvc: '', name: '', focus: undefined }
  })
  const { number, expiry, cvc, name, focus } = getValues()
  const onSubmit = data => {}

  return (
    <CardContent>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
              <Typography variant='h6'>Payment Method</Typography>
            </Box>
          </Grid>

          <Grid item xs={24} sm={6}>
            <Cards number={number} expiry={expiry} cvc={cvc} name={name} focused={focus} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('name', { required: true })}
              fullWidth
              label='Name'
              placeholder='Cristiano Ronaldo'
              error={!!errors?.name}
              helperText={errors?.name ? 'Name is required' : null}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('expiry', { required: true })}
              fullWidth
              label='Expiry'
              placeholder='MM/DD'
              inputProps={{ pattern: '[0-9]{2}/[0-9]{2}' }}
              error={!!errors?.expiry}
              helperText={errors?.expiry ? 'Expiry is required' : null}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address', { required: true })}
              fullWidth
              label='Address'
              placeholder='ABC Pvt. Ltd.'
              error={!!errors?.address}
              helperText={errors?.address ? 'Address is required' : null}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('phone', { required: true })}
              fullWidth
              label='Phone'
              placeholder='0382038678'
              error={!!errors?.phone}
              helperText={errors?.phone ? 'Phone is required' : null}
              InputLabelProps={{ shrink: true }}
            />
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
