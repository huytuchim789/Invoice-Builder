import { Box, FormControl, Select, MenuItem } from '@mui/material'
import { useSelectUserInvoiceTo } from 'src/@core/hooks/invoice/useSelectUserInvoiceTo'
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice.interface'
import { useInvoiceAddStore } from '../../store'

export const UserSelect = () => {
  const { setUser } = useInvoiceAddStore((state: any) => state.userSelectTabStore)
  const { setStatus } = useInvoiceAddStore((state: any) => state.statusDrawerStore)

  const { data: user_select } = useSelectUserInvoiceTo()

  const handleChangeUserSelect = (e: React.ChangeEvent<{ value: string }>) => {
    if (e.target.value !== '') {
      setUser(JSON.parse(e.target.value))
    }
  }

  return (
    <Box mt={2}>
      <FormControl variant='outlined' sx={{ minWidth: 120 }}>
        {user_select && (
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            defaultValue=''
            onChange={(e: any) => handleChangeUserSelect(e)}
            size='small'
          >
            <MenuItem value='' onClick={() => setStatus(true)}>
              Add new customer
            </MenuItem>
            {user_select?.map((user: IUserSelectInvoiceTo) => (
              <MenuItem value={JSON.stringify(user)} key={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  )
}
