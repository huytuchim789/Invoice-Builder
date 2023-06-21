import { Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { useSettingController } from 'src/views/account-settings/controller'
import { useSettingStore } from 'src/views/account-settings/store'
import { styled } from '@mui/material/styles'
import { LOGO } from 'src/@core/utils/constant'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const AddressTab = () => {
  const { info } = useSettingStore()
  const { getSettings } = useSettingController()
  useEffect(() => {
    getSettings()
  }, [])
  return (
    <>
      <ImgStyled src={info?.logo_url || LOGO} alt='Profile Pic' />
      <Box marginTop={4}>
        <Typography fontSize={12} color={'#808080'}>
          {info?.address}
          <br />
          {info?.email}
          <br />
          {info?.phone}
        </Typography>
      </Box>
    </>
  )
}

export default AddressTab
