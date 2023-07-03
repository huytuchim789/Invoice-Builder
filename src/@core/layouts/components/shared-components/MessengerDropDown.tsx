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
import MessageOutlinedIcon from 'mdi-material-ui/MessageOutline'
// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

import { useQueryClient } from '@tanstack/react-query'
import {} from 'src/@core/utils/api/markNotiRead'
import { QUERY_INVOICE_KEYS } from 'src/@core/utils/keys/invoice'
import { globalStore } from 'src/@core/hocs/global-store'
import { pusher } from 'src/@core/common/pusher'
import { useMessengers } from 'src/@core/hooks/useMessenger'
import { Daum, IMessengerResponse } from 'src/@core/models/api/messegner.interface'
import Link from '@mui/material/Link'

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

const MessengerDropdown = () => {
  // ** Hook
  const queryClient = useQueryClient()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { user } = globalStore((state: any) => state.userStore)
  const [updateStatus, setUpdateStatus] = useState(false)

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Call Data
  const { data: messengers } = useMessengers()
  const checkUnSeenMessage = (item: Daum) => {
    return !item.messages[item.messages.length - 1].seen.map(s => s?.email).includes(user?.email)
  }
  const countUnRead = useMemo(() => {
    return messengers?.data.filter((item: Daum) => {
      return checkUnSeenMessage(item)
    }).length
  }, [user, updateStatus])

  useEffect(() => {
    const channel = pusher.subscribe(`${user?.email}`)
    channel.bind(`conversation:update`, function (data: any) {
      const oldData = queryClient.getQueryData([QUERY_INVOICE_KEYS.MESSENGER_LIST]) as IMessengerResponse
      oldData?.data.forEach((item: Daum) => {
        if (item?.id === data?.id) {
          data!.messages[0]!.sender = data?.messages[0]?.seen.find((s: any) => s?.id === data?.messages[0]?.senderId)
          item!.messages = item?.messages.concat(data?.messages)
        }
      })
      setUpdateStatus(!updateStatus)
      queryClient.setQueryData([QUERY_INVOICE_KEYS.MESSENGER_LIST], {
        ...oldData
      })
    })
  }, [])

  // const markReadNoti = useMutation({
  //   mutationFn: async (id: string) => await markNotiRead(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([QUERY_INVOICE_KEYS.MESSENGER_LIST])
  //   },
  //   onError: (err: any) => {
  //     snackbar.error(err.message)
  //   }
  // })

  // const markReadAllNoti = useMutation({
  //   mutationFn: async () => await markAllNotiRead(),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([QUERY_INVOICE_KEYS.MESSENGER_LIST])
  //   },
  //   onError: (err: any) => {
  //     snackbar.error(err.message)
  //   }
  // })

  // ** Function
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
    // window.location.href = `${process.env.APP_CHAT}`
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

  // const handleMarkReadNoti = (id: string, read_at: string | null) => {
  //   if (read_at === null && !markReadNoti.isLoading) {
  //     markReadNoti.mutate(id)
  //   }
  // }

  return (
    <Fragment>
      <Badge badgeContent={countUnRead} color='primary'>
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <MessageOutlinedIcon />
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
            <Typography sx={{ fontWeight: 600 }}>Messengers</Typography>
            <Chip
              size='small'
              label={`${countUnRead} news`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {messengers &&
            messengers.data.map((noti: Daum) => (
              <Link
                key={noti.id}
                href={`${process.env.APP_CHAT}/conversations/${noti.id}}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <MenuItem style={{ backgroundColor: noti.createdAt === null ? '#808080' : '#FFFFFF' }}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Avatar alt='Flora' src={noti.messages[noti?.messages?.length - 1]?.sender.image} />
                    <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{noti.messages[noti?.messages?.length - 1]?.sender.name}</MenuItemTitle>
                      <MenuItemSubtitle variant='body2' fontWeight={!checkUnSeenMessage(noti) ? 'inherit' : 'bold'}>
                        {noti.messages[noti?.messages?.length - 1]?.body}
                      </MenuItemSubtitle>
                    </Box>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                      {dayjs(noti.messages[noti?.messages?.length - 1]?.sender.createdAt)
                        .utc()
                        .local()
                        .format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </Box>
                </MenuItem>
              </Link>
            ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button
            fullWidth
            variant='contained'
            // onClick={() => markReadAllNoti.mutate()}
          >
            Read All Messengers
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default MessengerDropdown
