import { Box, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const NoteInfo = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'}>
      <Typography color='gray'>Note:</Typography>
      <TextField
        style={{ marginTop: 3 }}
        fullWidth
        multiline
        minRows={3}
        maxRows={3}
        error={!!errors.note}
        {...register('note', { required: true })}
      />
      {errors.note && (
        <Typography color='red' mt={2}>
          Note is required
        </Typography>
      )}
    </Box>
  )
}

export default NoteInfo
