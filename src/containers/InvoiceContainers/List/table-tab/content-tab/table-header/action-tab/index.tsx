import { useRouter } from 'next/router'
import { Stack, IconButton } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Props {
  id: string
}

export const ActionTab = ({ id }: Props) => {
  const router = useRouter()
  //   const handleDelete = () => {}

  return (
    <Stack direction='row' gap={2} justifyContent='center'>
      <IconButton size='small'>
        <DeleteIcon fontSize='inherit' />
      </IconButton>
      <IconButton size='small' onClick={() => router.push(`/invoice/preview/${id}`)}>
        <VisibilityIcon fontSize='inherit' />
      </IconButton>
    </Stack>
  )
}
