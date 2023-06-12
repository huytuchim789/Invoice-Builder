import { Box, TextField, TextFieldProps, TextFieldVariants, Typography } from '@mui/material'

import { useFormContext } from 'react-hook-form'

interface Props {
  title: string
  info: string
  props?: {
    variant?: TextFieldVariants
  } & Omit<TextFieldProps, 'variant'>
}

const FormItem = ({ title, info, props }: Props) => {
  const { register } = useFormContext()

  return (
    <Box mt={3}>
      <Typography>{title}</Typography>
      <TextField {...register(info)} required fullWidth {...props} />
    </Box>
  )
}

export default FormItem
