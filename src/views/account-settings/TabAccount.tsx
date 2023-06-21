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
import { useSettingController } from './controller'
import { useSettingStore } from './store'

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

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [img, setImg] = useState<any>(null)
  const settingController = useSettingController()
  const { info, imgSrc, setImgSrc } = useSettingStore()

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
    register
  } = useForm({
    values: { ...info, logo: info?.logo_url }
  })
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])
      setImg(files[0])
    }
  }
  console.log(errors)

  const onSubmit = data => {
    const formData = new FormData()
    formData.append('logo', img)
    formData.append('logo_url', img ? '' : imgSrc)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('address', data.address)
    formData.append('phone', data.phone)
    settingController.changSettings(formData)
  }
  useEffect(() => {
    settingController.getSettings()
  }, [])

  return (
    <CardContent>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Your Logo
                  <input
                    {...register('logo')}
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Address' placeholder='USA' />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('name', { required: true })}
              fullWidth
              label='Name'
              placeholder='Facebook Org'
              error={!!errors?.name}
              helperText={errors?.name ? 'Name is required' : null}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('email', { required: true })}
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              error={!!errors?.email}
              helperText={errors?.email ? 'Email is required' : null}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
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
            <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Save Changes
            </Button>
            <Button onClick={() => reset()} variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
