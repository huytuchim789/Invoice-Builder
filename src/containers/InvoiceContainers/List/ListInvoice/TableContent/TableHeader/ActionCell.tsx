//@ts-nocheck

import { useState } from 'react'
import { useRouter } from 'next/router'
import { Stack, Popover, Button, styled, Typography, Link, Box } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandCircleDownOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/EditOutlined'
import DownloadIcon from '@mui/icons-material/DownloadOutlined'
import { useConfirm } from 'material-ui-confirm'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { deleteInvoice } from 'src/@core/utils/api/invoice/deleteInvoice'
import { globalStore } from 'src/@core/hocs/global-store'

interface Props {
  params: any
}

const ActionButton = styled('div')({
  padding: '10px 15px',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  cursor: 'pointer',
  '& p': {
    fontSize: '18px',
    letterSpacing: 'normal'
  },
  '&:hover': {
    color: '#FFFFFF',
    backgroundColor: '#808080',
    '& p': {
      color: '#FFFFFF'
    }
  }
})

const ActionCell = ({ params }: Props) => {
  const router = useRouter()
  const { query } = useRouter()
  const { user } = globalStore(state => state.userStore)

  const snackbar = useSnackbarWithContext()
  const queryClient = useQueryClient()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const confirm = useConfirm()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { mutate: mutateDeleteInvoice, isLoading: isDeleteInvoice } = useMutation({
    mutationFn: (): Promise<any> => deleteInvoice(params.id),
    onSuccess: (data: { message: string[] }) => {
      queryClient.invalidateQueries([
        QUERY_INVOICE_KEYS.EMAIL_TRANSACTION,
        query?.page || 1,
        query?.limit || 5,
        query?.keyword || '',
        query?.status || '',
        query?.startDate || '',
        query?.endDate || ''
      ])

      queryClient.setQueryData(
        [
          QUERY_INVOICE_KEYS.EMAIL_TRANSACTION,
          query?.page || 1,
          query?.limit || 5,
          query?.keyword || '',
          query?.status || '',
          query?.startDate || '',
          query?.endDate || ''
        ],
        (previousData: Array<any> | undefined | any) => {
          previousData ? previousData?.filter((item: any) => item.id !== data.id) : previousData
        }
      )
      snackbar.success('Delete Invoice Successfully')
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })
  return (
    <Stack direction='row' gap={2} justifyContent='center'>
      <Button size='small' aria-describedby={Boolean(anchorEl) ? 'simple-popover' : undefined} onClick={handleClick}>
        <ExpandMoreIcon />
      </Button>
      <Popover
        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {user?.role==='guest'?<></>:<><ActionButton onClick={() => router.replace(`/invoice/edit/${params.invoice.id}`)}>
          <EditIcon fontSize='medium' />
          <Typography>Edit</Typography>
        </ActionButton>
        <ActionButton
          onClick={() => {
            confirm({
              description: (
                <Box>
                  Are you sure want to delete invoice
                  <Typography component={'span'} fontWeight={'500'}>{` ${params.invoice.code}`}</Typography>
                </Box>
              )
            })
              .then(() => {
                mutateDeleteInvoice()
              })
              .catch(() => console.error('Deletion cancelled.'))
          }}
        >
          <DeleteIcon fontSize='medium' />
          <Typography>Delete</Typography>
        </ActionButton></>}
        <ActionButton onClick={() => router.push(`/invoice/preview/${params.id}`)}>
          <VisibilityIcon fontSize='medium' />
          <Typography>Detail</Typography>
        </ActionButton>
        <Link href={params.invoice?.media ? params.invoice?.media[0]?.file_url : ''} target='_blank'>
          <ActionButton>
            <DownloadIcon fontSize='medium' />
            <Typography>Download</Typography>
          </ActionButton>
        </Link>
      </Popover>
    </Stack>
  )
}

export default ActionCell
