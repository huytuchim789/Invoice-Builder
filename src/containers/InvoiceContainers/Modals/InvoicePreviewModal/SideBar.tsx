import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ISettingState } from '.'

interface Props {
  setSetting: Dispatch<SetStateAction<ISettingState>>
}

const SideBar = ({ setSetting }: Props) => {
  const onChangeSetting = (props: string) => (e: any) => {
    setSetting(prev => ({ ...prev, [props]: e.target.value }))
  }

  return (
    <Box display='flex' gap={6} flexDirection='column' flex={1}>
      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label'>Format</FormLabel>
        <RadioGroup
          onChange={onChangeSetting('format')}
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='bold'
          name='radio-buttons-group'
        >
          <FormControlLabel value='bold' control={<Radio />} label='Bold' />
          <FormControlLabel value='light' control={<Radio />} label='Light' />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Font</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Font'
          defaultValue='AlegreyaSans'
          onChange={onChangeSetting('font')}
        >
          <MenuItem value='AlegreyaSans'>AlegreyaSans</MenuItem>
          <MenuItem value='OpenSans'>OpenSans</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SideBar
