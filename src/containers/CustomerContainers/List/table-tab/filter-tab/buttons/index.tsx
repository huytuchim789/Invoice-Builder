import { useState } from 'react'

import { Box, Button, Popover, Typography, styled } from '@mui/material'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import CreateCustomerModal from 'src/containers/CustomerContainers/Modals/CreateCustomerModal'
import ImportCustomerModal from 'src/containers/CustomerContainers/Modals/ImportCustomerModal'

const ActionButton = styled(Box)({
  padding: '10px',
  display: 'flex',
  gap: '6px',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
})

const TableHeaderButtons = () => {
  const [isOpenCreateCustomerModal, setIsOpenCreateCustomerModal] = useState<boolean>(false)
  const [isOpenImportCustomerModal, setIsOpenImportCustomerModal] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box display='flex' gap={3} alignContent='center'>
      <Button variant='contained' size='small' onClick={() => setIsOpenCreateCustomerModal(true)}>
        Create Customer
      </Button>
      <Button
        aria-describedby={Boolean(anchorEl) ? 'simple-popover' : undefined}
        variant='contained'
        onClick={handleClick}
        endIcon={!Boolean(anchorEl) ? <ArrowDropDownIcon fontSize='large' /> : <ArrowDropUpIcon fontSize='large' />}
      >
        Actions
      </Button>
      <Popover
        id={Boolean(anchorEl) ? 'simple-popover' : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box>
          <ActionButton onClick={() => setIsOpenImportCustomerModal(true)}>
            <FileUploadIcon fontSize='small' />
            <Typography>Import Data</Typography>
          </ActionButton>
          <ActionButton onClick={() => setIsOpenImportCustomerModal(true)}>
            <FileDownloadIcon fontSize='small' />
            <Typography>Export Data</Typography>
          </ActionButton>
        </Box>
      </Popover>

      {isOpenCreateCustomerModal && (
        <CreateCustomerModal
          isOpen={isOpenCreateCustomerModal}
          handleCloseModal={() => setIsOpenCreateCustomerModal(false)}
        />
      )}
      {isOpenImportCustomerModal && (
        <ImportCustomerModal
          isOpen={isOpenImportCustomerModal}
          handleCloseModal={() => setIsOpenImportCustomerModal(false)}
        />
      )}
    </Box>
  )
}

export default TableHeaderButtons
