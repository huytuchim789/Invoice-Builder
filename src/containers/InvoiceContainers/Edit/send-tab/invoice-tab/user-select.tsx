// ** MUI imports
import { Box, FormControl, Select, MenuItem } from '@mui/material'

// ** Interface imports
import { IUserSelectInvoiceTo } from 'src/@core/models/api/invoice/invoice.interface'

// ** Common imports
import { useSelectUserInvoiceTo } from 'src/@core/hooks/invoice/useSelectUserInvoiceTo'

// ** Store imports
import { useInvoiceEditStore } from '../../store'

export const UserSelect = () => {
  const { user, setUser } = useInvoiceEditStore((state: any) => state.userSelectTabStore)
  const { setStatus } = useInvoiceEditStore((state: any) => state.statusDrawerStore)

  const { data: user_select } = useSelectUserInvoiceTo()

  const handleChangeUserSelect = (e: React.ChangeEvent<{ value: string }>) => {
    if (e.target.value !== '') {
      setUser(JSON.parse(e.target.value))
    }
  }

  return (
    <Box mt={2}>
      <FormControl variant='outlined' sx={{ minWidth: 120 }}>
        {user_select && user.name !== '' && (
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            defaultValue={JSON.stringify(user)}
            onChange={(e: any) => handleChangeUserSelect(e)}
            size='small'
          >
            <MenuItem value='' onClick={() => setStatus(true)}>
              Add new customer
            </MenuItem>
            {user_select?.data.map((user: IUserSelectInvoiceTo) => (
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
