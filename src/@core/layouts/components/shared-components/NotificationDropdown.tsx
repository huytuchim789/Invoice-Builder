import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// ** React Imports
import { useState, SyntheticEvent, useEffect, Fragment, ReactNode, useMemo } from 'react'

// ** MUI Imports
import { Badge, Box, Chip, Button, IconButton } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { useNotificationListData } from 'src/@core/hooks/useNotificationData'
import { INotificationListData, INotificationListDataResponse } from 'src/@core/models/api/notification.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markNotiRead } from 'src/@core/utils/api/markNotiRead'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { useSnackbarWithContext } from 'src/@core/common/snackbar'
import { markAllNotiRead } from 'src/@core/utils/api/markAllNotiRead'
import { globalStore } from 'src/@core/hocs/global-store'
import { pusher } from 'src/@core/common/pusher'

dayjs.extend(utc)

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
  // ** Hook
  const queryClient = useQueryClient()
  const snackbar = useSnackbarWithContext()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { user } = globalStore((state: any) => state.userStore)

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [page] = useState<number>(0)
  const [limit] = useState<number>(10)
  const [updateStatus, setUpdateStatus] = useState<boolean>(false)
  const [keyword] = useState<string>('')

  // ** Call Data
  const { data: noti_list } = useNotificationListData({ page, limit, keyword })

  const countUnRead = useMemo(() => {
    if (noti_list) {
      return noti_list.data.reduce((accumulate, currentData) => {
        if (currentData.read_at === null) {
          return accumulate + 1
        }
        return accumulate
      }, 0)
    }

    return 0
  }, [noti_list, updateStatus])

  useEffect(() => {
    if (user.id) {
      const channel = pusher.subscribe(`private-App.Models.User.${user.id}`)

      channel.bind(`Illuminate\\Notifications\\Events\\BroadcastNotificationCreated`, function (data: any) {
        const oldData = queryClient.getQueryData([
          QUERY_INVOICE_KEYS.NOTIFICATION_LIST,
          page,
          limit,
          keyword
        ]) as INotificationListDataResponse

        oldData.data.unshift(data)

        queryClient.setQueryData([QUERY_INVOICE_KEYS.NOTIFICATION_LIST], {
          ...oldData
        })

        setUpdateStatus(!updateStatus)
      })
    }
  }, [user])

  const markReadNoti = useMutation({
    mutationFn: async (id: string) => await markNotiRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.NOTIFICATION_LIST])
    },
    onError: (err: any) => {
      snackbar.error(err.message)
    }
  })

  const markReadAllNoti = useMutation({
    mutationFn: async () => await markAllNotiRead(),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_INVOICE_KEYS.NOTIFICATION_LIST])
    },
    onError: (err: any) => {
      snackbar.error(err.message)
    }
  })

  // ** Function
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  const handleMarkReadNoti = (id: string, read_at: string | null) => {
    if (read_at === null && !markReadNoti.isLoading) {
      markReadNoti.mutate(id)
    }
  }

  return (
    <Fragment>
      <Badge badgeContent={countUnRead} color='primary'>
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <BellOutline />
        </IconButton>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={`${countUnRead} news`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {noti_list &&
            noti_list.data.map((noti: INotificationListData) => (
              <MenuItem
                onClick={() => handleMarkReadNoti(noti.id, noti.read_at)}
                key={noti.id}
                style={{ backgroundColor: noti.read_at === null ? '#ccc' : '#FFFFFF' }}
              >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Avatar alt='Flora' src={noti.data.sender.avatar_url} />
                  <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    <MenuItemTitle>{noti.data.sender.name}</MenuItemTitle>
                    <MenuItemSubtitle variant='body2'>{noti.data.message}</MenuItemSubtitle>
                  </Box>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {dayjs(noti.created_at).utc().local().format('YYYY-MM-DD HH:mm:ss')}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={() => markReadAllNoti.mutate()}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
