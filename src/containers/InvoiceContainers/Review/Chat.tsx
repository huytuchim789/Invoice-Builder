import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Box, Button, Card, CardContent, CardHeader, Grid, InputAdornment, Stack, TextField } from '@mui/material'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import css from 'styled-jsx/css'

const Wrapper = styled.div`
  // width: 300px;
  box-sizing: border-box;
  border-left: 1px solid #dfe3e9;
  flex-shrink: 0;
`
const Head = styled.p`
  font-weight: bold;
  padding: 20px 10px 10px;
  box-shadow: 0px 2px 2px rgba(64, 80, 119, 0.1);
`
const ChatList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  height: calc(100vh - 54px);
  overflow: scroll;
  scroll-behavior: smooth;
`
const ChatItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 20px;
  border-bottom: 1px solid #dfe3e9;
  .pin {
    position: sticky;
    top: 10px;
    height: 30px;
    width: 30px;
    flex-shrink: 0;
    .number {
      position: absolute;
      left: 12px;
      top: 4px;
      font-size: 12px;
      color: #fff;
    }
  }
  .content {
    width: 100%;
  }
  .author {
    font-size: 12px;
    font-weight: bold;
  }
  .createdAt {
    margin-left: 16px;
    font-size: 12px;
    color: #888;
  }
  .message {
    margin: 0 4px 10px;
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 20px;
  }
  .input {
    padding-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
  }
`

interface Props {
  chatList: {
    messages: {
      id: string
      author: string
      createdAt: string
      message: string
      avatar_url: string
    }[]
    inputValue: string
    pin: { xRatio: number; yRatio: number } // 0 ~ 1
  }[]
  activeChatIndex: number
  updateMessageHandler: (value: string, index: number) => void
  submitMessageHandler: (index: number) => void
  chatListRef: React.MutableRefObject<null>
  activeItemRef: React.MutableRefObject<null>
  textAreaRef: React.MutableRefObject<null>
}

const Chat = ({
  chatList,
  activeChatIndex,
  updateMessageHandler,
  submitMessageHandler,
  chatListRef,
  activeItemRef,
  textAreaRef
}: Props) => {
  return (
    <Card className={`wrapper ${styles.className}`}>
      {/* <Divider /> */}
      <CardHeader title='Comments' />
      <Divider variant='fullWidth' />
      <CardContent sx={{ paddingLeft: '0px', paddingRight: '0px' }} ref={chatListRef}>
        {chatList.map((c, i) => (
          <Grid className={`container ${styles.className}`} key={i} container>
            <Grid item lg={2} justifyContent={'center'}>
              <div className={`pin ${styles.className}`}>
                <Image src='/images/pin.svg' alt='pin' layout='fill' />
                <span className={`number ${styles.className}`}>{i + 1}</span>{' '}
              </div>
            </Grid>
            <Grid item lg={9}>
              <List sx={{ width: '100%' }} className={`no-pt ${styles.className}`}>
                {c.messages.map((m, k) => (
                  <ListItem
                    alignItems='flex-start'
                    key={`${c.pin.xRatio} ${c.pin.yRatio}`}
                    ref={activeChatIndex === i ? activeItemRef : undefined}
                    className={`no-pt no-pl ${styles.className}`} // disablePadding
                  >
                    <ListItemAvatar>
                      <Avatar src={m?.avatar_url} sizes='small' />
                    </ListItemAvatar>
                    <Stack>
                      <ListItemText
                        key={c.pin.xRatio + c.pin.yRatio + m.id}
                        primary={
                          <Stack direction='row' alignItems='center' spacing={'40px'}>
                            <Typography variant='body2'>
                              <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {m?.author}
                              </Box>
                            </Typography>
                            <Typography variant='subtitle2'>
                              <Box component='span' sx={{ fontWeight: 400, color: 'text.disabled' }}>
                                {m?.createdAt}
                              </Box>
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Stack>
                            <Typography
                              sx={{ display: 'inline' }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              {m.message}
                            </Typography>
                          </Stack>
                        }
                      />
                    </Stack>
                  </ListItem>
                ))}
                {i === activeChatIndex && (
                  <Stack spacing={2}>
                    <TextField
                      className='input'
                      ref={textAreaRef}
                      fullWidth
                      multiline
                      value={c.inputValue}
                      minRows={3}
                      onChange={e => updateMessageHandler(e.currentTarget.value, i)}
                      label=''
                      placeholder='Comment'
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <MessageOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                    {/* <button onClick={() => submitMessageHandler(i)}>post</button> */}
                    <Button
                      className={`submit-btn ${styles.className}`}
                      size='medium'
                      variant='contained'
                      onClick={() => submitMessageHandler(i)}
                    >
                      Post
                    </Button>
                  </Stack>
                )}{' '}
              </List>
            </Grid>
            <Grid item lg={12}>
              <Divider variant='fullWidth' />
            </Grid>
          </Grid>
        ))}
      </CardContent>
      {styles.styles}
    </Card>
  )
}

const styles = css.resolve`
  .pin {
    position: sticky;
    top: 0px;
    height: 30px;
    width: 30px;
    flex-shrink: 0;
  }
  .number {
    position: absolute;
    left: 12px;
    top: 4px;
    font-size: 12px;
    color: #fff;
  }
  .submit-btn {
    width: 20%;
  }
  .container {
    width: 100%;

    paddingp-top: 10px;
  }
  .no-pt {
    padding-top: 0px;
  }
  .no-pl {
    padding-left: 2px;
  }
  .wrapper {
    height: calc(100vh);
    overflow: scroll;
    scroll-behavior: smooth;
    background-color: #fff;
  }
`
export { Chat }
