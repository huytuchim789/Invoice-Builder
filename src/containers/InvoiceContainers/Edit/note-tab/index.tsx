import { ChangeEvent } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { useInvoiceEditStore } from '../store'

export const NoteTab = () => {
  const { note, setNote } = useInvoiceEditStore((state: any) => state.noteTabStore)

  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'}>
      <Typography color='gray'>Note:</Typography>
      <TextField
        style={{ marginTop: 3 }}
        fullWidth
        multiline
        value={note}
        minRows={3}
        maxRows={3}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNote(e.target.value)}
      />
    </Box>
  )
}
