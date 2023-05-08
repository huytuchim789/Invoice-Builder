import { NextPage } from 'next'
import { ReactElement, forwardRef, useState } from 'react'

import {
  Box,
  Card,
  Typography,
  Grid,
  InputAdornment,
  Input,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  InputLabel,
  TableCell,
  TableBody,
  TableContainer,
  TextField,
  Button,
  TableRow
} from '@mui/material'

import Grid3x3Icon from '@mui/icons-material/Grid3x3'
import SendIcon from '@mui/icons-material/Send'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AddIcon from '@mui/icons-material/Add'

import DatePicker from 'react-datepicker'

export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  formatString?: (value: string) => ReactElement
  formatNumber?: (value: number) => ReactElement
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' variant='outlined' fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const columns: readonly Column[] = [
  { id: 'item', label: 'item', minWidth: 300 },
  { id: 'cost', label: 'cost', minWidth: 100 },
  {
    id: 'hours',
    label: 'Hours',
    minWidth: 100
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100
  },
  {
    id: 'action',
    label: '',
    minWidth: 50
  }
]

const InvoiceEditPage: NextPage = () => {
  const [startDate, setStartDate] = useState<Date | null | undefined>(null)
  const [endDate, setEndDate] = useState<Date | null | undefined>(null)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={9}>
        <Card style={{ width: '100%' }}>
          <Box padding={3}>
            <Grid container>
              <Grid item lg={7} md={12}>
                <Typography variant='h6'>Invoice</Typography>
                <Box marginTop={4}>
                  <Typography fontSize={12} color={'#808080'}>
                    Office 149, 450 South Brand Brooklyn
                    <br />
                    San Diego County, CA 91905, USA
                    <br />
                    +1 (123) 456 7891, +44 (876) 543 2198
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={5} md={12}>
                <Grid container alignItems='center'>
                  <Grid item lg={4} md={12}>
                    <Typography>Invoice</Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Input
                      type='text'
                      placeholder='Search News here...'
                      startAdornment={
                        <InputAdornment position='start'>
                          <Grid3x3Icon />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container alignItems='center' marginTop={3}>
                  <Grid item lg={4} md={12}>
                    <Typography>Date Issued:</Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <DatePicker
                      selected={startDate}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText='MM-DD-YYYY'
                      customInput={<CustomInput />}
                      id='form-layouts-separator-date'
                      onChange={(date: Date) => setStartDate(date)}
                    />
                  </Grid>
                </Grid>

                <Grid container alignItems='center' marginTop={3}>
                  <Grid item lg={4} md={12}>
                    <Typography>Date Due:</Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <DatePicker
                      selected={endDate}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText='MM-DD-YYYY'
                      customInput={<CustomInput />}
                      id='form-layouts-separator-date'
                      onChange={(date: Date) => setEndDate(date)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box padding={3} borderColor='#808080' borderTop={1} mt={2}>
            <Grid container justifyContent={'space-between'}>
              <Grid item sm={4} md={4} lg={4}>
                <Typography>Invoice To:</Typography>
                <Box mt={2}>
                  <FormControl variant='outlined' sx={{ minWidth: 120 }}>
                    <Select
                      labelId='demo-simple-select-standard-label'
                      id='demo-simple-select-standard'
                      defaultValue={10}
                      size='small'
                    >
                      <MenuItem value={10}>Túuuu</MenuItem>
                      <MenuItem value={20}>Nguuuu</MenuItem>
                      <MenuItem value={30}>Vlllll</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box marginTop={2}>
                  <Typography fontSize={12} color={'#808080'}>
                    Hall-Robbins PLC
                    <br />
                    7777 Mendez Plains
                    <br />
                    (616) 865-4180
                    <br />
                    don85@johnson.com
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={4} md={4} lg={4}>
                <Typography>Bill to</Typography>
                <Grid container columnGap={2} mt={2} color={'#808080'}>
                  <Grid container alignItems='center' lg={12}>
                    <Grid item lg={4} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        Total Due:
                      </Typography>
                    </Grid>
                    <Grid item lg={8} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        $ 12,110.55
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' lg={12}>
                    <Grid item lg={4} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        Bank name:
                      </Typography>
                    </Grid>
                    <Grid item lg={8} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        American Bank
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' lg={12}>
                    <Grid item lg={4} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        Country:
                      </Typography>
                    </Grid>
                    <Grid item lg={8} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        United States
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' lg={12}>
                    <Grid item lg={4} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        IBAN:
                      </Typography>
                    </Grid>
                    <Grid item lg={8} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        ETD95476213874685
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' lg={12}>
                    <Grid item lg={4} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        SWIFT code:
                      </Typography>
                    </Grid>
                    <Grid item lg={8} md={12}>
                      <Typography fontSize={14} color={'#808080'}>
                        BR91905
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box padding={3} borderTop={1} borderColor={'#808080'}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table sx={{ minWidth: 650 }} stickyHeader aria-label={'Okok'}>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow style={{ alignItems: 'start' }}>
                    <TableCell>
                      <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
                        <Select
                          fullWidth
                          labelId='demo-simple-select-outlined-label'
                          id='demo-simple-select-outlined'
                          defaultValue={10}
                          size='small'
                        >
                          <MenuItem value={10}>Túuuu</MenuItem>
                          <MenuItem value={20}>Nguuuu</MenuItem>
                          <MenuItem value={30}>Vlllll</MenuItem>
                        </Select>
                      </FormControl>
                      <Box mt={4}>
                        <TextField id='outlined-multiline-static' multiline rows={2} variant='outlined' fullWidth />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField sx={{ width: '150px' }} type='number' size='small' variant='outlined' />
                      <Box mt={2}>
                        <Typography fontSize={12} color={'#808080'}>
                          Discount:
                        </Typography>
                        <Typography fontSize={12} color={'#808080'}>
                          0% 0% 0%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField type='number' sx={{ width: '150px' }} size='small' variant='outlined' />
                    </TableCell>
                    <TableCell>
                      <Typography>$ 24.00</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>x</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={4}>
              <Button
                variant='contained'
                size='small'
                startIcon={
                  <InputAdornment position='start'>
                    <AddIcon style={{ color: '#FFF' }} />
                  </InputAdornment>
                }
              >
                Add Item
              </Button>
            </Box>
          </Box>
          <Box padding={3} borderTop={1} borderColor={'#808080'} mt={6}>
            <Grid container justifyContent='space-between'>
              <Grid item sm={4} md={4} lg={4}>
                <Box display='flex' gap={2} alignItems='center'>
                  <Typography>Saleperson:</Typography>
                  <TextField size='small' defaultValue='Tommy Shelby' />
                </Box>
                <TextField size='small' defaultValue='Thanks for your business' style={{ marginTop: '10px' }} />
              </Grid>
              <Grid item sm={4} md={4} lg={4}>
                <Grid container alignItems='center' lg={12}>
                  <Grid item lg={4} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      Subtotal:
                    </Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      $1800
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems='center' lg={12}>
                  <Grid item lg={4} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      Discount:
                    </Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      $28
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems='center' lg={12}>
                  <Grid item lg={4} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      Tax:
                    </Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      21%
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems='center' lg={12} style={{ borderTop: 1, borderColor: '#808080' }}>
                  <Grid item lg={4} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      Total:
                    </Typography>
                  </Grid>
                  <Grid item lg={8} md={12}>
                    <Typography fontSize={14} color={'#808080'}>
                      $1690
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <Card>
          <Box p={3} display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Button
              fullWidth
              variant='contained'
              startIcon={
                <InputAdornment position='start'>
                  <SendIcon style={{ color: '#FFF' }} />
                </InputAdornment>
              }
            >
              Send Invoice
            </Button>

            <Button fullWidth variant='outlined'>
              Preview
            </Button>

            <Button fullWidth variant='outlined'>
              Save
            </Button>

            <Button
              fullWidth
              variant='contained'
              color='success'
              startIcon={
                <InputAdornment position='start'>
                  <AttachMoneyIcon style={{ color: '#FFF' }} />
                </InputAdornment>
              }
            >
              Add Payment
            </Button>
          </Box>
        </Card>
        <Box mt={6}>
          <FormControl variant='outlined' sx={{ minWidth: 120, width: '100%' }}>
            <InputLabel id='demo-simple-select-outlined-label'>Accept payments via</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              defaultValue={10}
              label='Accept payments via'
              aria-label='Accept payments via'
            >
              <MenuItem value={10}>Túuuu</MenuItem>
              <MenuItem value={20}>Nguuuu</MenuItem>
              <MenuItem value={30}>Vlllll</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  )
}

export default InvoiceEditPage
