import { ChangeEvent } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { useNoteInfoStore } from './store'

const NoteInfo = () => {
  const { setNote } = useNoteInfoStore()

  return (
    <Box padding={3} borderTop={1} borderColor={'#808080'}>
      <Typography color='gray'>Note:</Typography>
      <TextField
        style={{ marginTop: 3 }}
        fullWidth
        multiline
        minRows={3}
        maxRows={3}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNote(e.target.value)}
      />
    </Box>
  )
}

export default NoteInfo
