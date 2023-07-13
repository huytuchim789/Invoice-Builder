import { useState } from 'react'

import { Box, Button, Popover, Typography, styled } from '@mui/material'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import { exportCustomer } from 'src/@core/utils/api/customer/export'
import CreateItemModal from 'src/containers/ItemInvoiceContainers/Modals/CreateItemModal'
import ImportItemModal from 'src/containers/ItemInvoiceContainers/Modals/ImportItemModal'

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

  const handleExportCustomerData = async () => {
    const response = await exportCustomer()

    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.csv')
      document.body.appendChild(link)
      link.click()
    }
  }

  return (
    <Box display='flex' gap={3} alignContent='center'>
      <Button variant='contained' size='small' onClick={() => setIsOpenCreateCustomerModal(true)}>
        Create Item
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
          <ActionButton onClick={handleExportCustomerData}>
            <FileDownloadIcon fontSize='small' />
            <Typography>Export Data</Typography>
          </ActionButton>
        </Box>
      </Popover>

      {isOpenCreateCustomerModal && (
        <CreateItemModal
          isOpen={isOpenCreateCustomerModal}
          handleCloseModal={() => setIsOpenCreateCustomerModal(false)}
        />
      )}
      {isOpenImportCustomerModal && (
        <ImportItemModal
          isOpen={isOpenImportCustomerModal}
          handleCloseModal={() => setIsOpenImportCustomerModal(false)}
        />
      )}
    </Box>
  )
}

export default TableHeaderButtons
