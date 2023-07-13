// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

import { CsvIcon, ExcelIcon } from 'src/@core/common/icons'
import Papa from 'papaparse'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Button, Dialog, DialogContent, DialogTitle, Fade } from '@mui/material'
import CustomerTable from './table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { importCustomer } from 'src/@core/utils/api/customer/import'
import { validateCustomerFile } from 'src/@core/utils/api/customer/validate-file'
import { AxiosResponse } from 'axios'

interface FileProp {
  name: string
  type: string
  size: number
}

interface Props {
  isOpen: boolean
  handleCloseModal: () => void
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 160
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

export interface IBodyTable {
  Address: string
  Company: string
  'Contact Number': string
  'Contact Number Country': string
  Country: string
  Email: string
  Name: string
}

const ImportCustomerModal = ({ isOpen, handleCloseModal }: Props) => {
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()

  // ** State
  const [files, setFiles] = useState<File[]>([])
  const [headerTable, setHeaderTable] = useState<string[]>([])
  const [bodyTable, setBodyTable] = useState<IBodyTable[]>([])
  const [invalidFile, setInvalidFile] = useState<boolean>(false)

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xlsx', '.xls']
    },
    onDrop: (acceptedFiles: File[]) => {
      const formData = new FormData()

      formData.append('csv_file', acceptedFiles.map((file: File) => Object.assign(file))[0])

      validateFile.mutate(formData)

      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <Box key={file.name} display='flex' gap={3} alignItems='center'>
      {file.type === 'text/csv' ? <CsvIcon width={40} height={40} /> : <ExcelIcon width={40} height={40} />}
      <Typography>{file.name}</Typography>
    </Box>
  ))

  const importFile = useMutation({
    mutationFn: async (formData: any) => await importCustomer(formData),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.CUSTOMER_LIST])

      handleCloseModal()
      snackbar.success(data.data.message)
    },
    onError: (err: { response: any }) => {
      const { response } = err

      snackbar.error(response.data.message)
    }
  })

  const validateFile = useMutation({
    mutationFn: async (formData: any) => await validateCustomerFile(formData),
    onSuccess: (data: AxiosResponse) => {
      setInvalidFile(true)

      snackbar.success(data.data.message)
    },
    onError: (err: { response: any }) => {
      const { response } = err

      setInvalidFile(false)
      snackbar.error(response.data.message)
    }
  })

  useEffect(() => {
    if (files.length > 0) {
      if (validateFile.isSuccess) {
        Papa.parse(files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (result: { data: IBodyTable[]; meta: { fields: string[] } }) {
            setHeaderTable(result.meta.fields)
            setBodyTable(result.data)
          }
        })
      }
    }
  }, [files, validateFile.isSuccess])

  const handleImportCustomer = () => {
    const formData = new FormData()

    formData.append('csv_file', files[0])

    importFile.mutate(formData)
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} TransitionComponent={Fade} fullWidth maxWidth='md'>
      <DialogTitle textAlign='center'>Import Customer</DialogTitle>
      <DialogContent>
        <Box {...getRootProps({ className: 'dropzone' })} sx={{ cursor: 'pointer' }}>
          <input {...getInputProps()} />
          {files.length ? (
            img
          ) : (
            <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
              <Img alt='Upload img' src='/images/upload.png' />
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                  Drop files here or click thorough your machine
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box>
          <CustomerTable tableBody={bodyTable} tableHeader={headerTable} />
        </Box>
        <Box display='flex' justifyContent='center' alignContent='center' gap={5} paddingTop={5}>
          <Button
            variant='contained'
            color='primary'
            disabled={files.length === 0 || importFile.isLoading || !invalidFile}
            onClick={handleImportCustomer}
          >
            Upload
          </Button>
          <Button variant='outlined' color='error' onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ImportCustomerModal
