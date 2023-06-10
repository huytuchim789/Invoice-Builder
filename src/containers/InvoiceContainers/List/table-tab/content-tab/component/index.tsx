import DraftsIcon from '@mui/icons-material/Drafts'
import CircularProgress from '@mui/material/CircularProgress'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'

export const getStatusIcons = (status: string) => {
  switch (status) {
    case 'draft':
      return <DraftsIcon fontSize='small' />
      break
    case 'pending':
      return <CircularProgress size={16} />
      break
    case 'sent':
      return <MarkEmailReadIcon fontSize='small' />
      break
    case 'failed':
      return <SmsFailedIcon fontSize='small' />
      break
    default:
      return <DraftsIcon fontSize='small' />
  }
}
