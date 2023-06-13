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

const ImportCustomerModal = ({ isOpen, handleCloseModal }: Props) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xlsx', '.xls']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  useEffect(() => {
    if (files.length > 0) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (result: any) {
          console.log(result)
        }
      })
    }
  }, [files])

  const img = files.map((file: FileProp) => (
    <Box key={file.name} display='flex' gap={3} alignItems='center'>
      {file.type === 'text/csv' ? <CsvIcon width={40} height={40} /> : <ExcelIcon width={40} height={40} />}
      <Typography>{file.name}</Typography>
    </Box>
  ))

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
        <Box display='flex' justifyContent='center' alignContent='center' gap={5} paddingTop={5}>
          <Button variant='contained' color='primary' disabled={files.length === 0}>
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
