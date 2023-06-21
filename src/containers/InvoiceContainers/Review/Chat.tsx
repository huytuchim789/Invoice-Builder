import React from 'react'
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
import { useReviewStore } from './store'
import { Controller, useFormContext } from 'react-hook-form'
import { makeStyles } from '@mui/styles'

interface Props {
  submitMessageHandler: (index: number) => void
  chatListRef: React.MutableRefObject<null>
  activeItemRef: React.MutableRefObject<null>
  textAreaRef: React.MutableRefObject<null>
}
const useHelperTextStyles = makeStyles(() => ({
  root: {
    marginLeft: 0
  }
}))
const Chat = ({ submitMessageHandler, chatListRef, activeItemRef, textAreaRef }: Props) => {
  const helperTextStyles = useHelperTextStyles()
  const { chatList, activeChatIndex, fileUrl } = useReviewStore()

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext()
  const onSubmit = (data: any, callback: any) => {
    callback()
  }

  return (
    <Card className={`wrapper ${styles.className}`}>
      {/* <Divider /> */}
      <CardHeader title='Comments' />
      <Divider variant='fullWidth' />
      {fileUrl ? (
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
                  {c.comments.map((m, k) => (
                    <ListItem
                      alignItems='flex-start'
                      key={`${c.coordinate_X} ${c.coordinate_Y}`}
                      ref={activeChatIndex === i ? activeItemRef : undefined}
                      className={`no-pt no-pl ${styles.className}`} // disablePadding
                    >
                      <ListItemAvatar>
                        <Avatar src={m?.user?.avatar_url} sx={{ height: '35px', width: '35px' }} />
                      </ListItemAvatar>
                      <Stack>
                        <ListItemText
                          key={c.coordinate_X + c.coordinate_Y + m.id}
                          primary={
                            <Stack direction='row' alignItems='center' spacing={'40px'}>
                              <Typography variant='body2'>
                                <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  {m?.user?.name}
                                </Box>
                              </Typography>
                              <Typography variant='subtitle2'>
                                <Box component='span' sx={{ fontWeight: 400, color: 'text.disabled' }}>
                                  {m?.created_at}
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
                                {m?.content}
                              </Typography>
                            </Stack>
                          }
                        />
                      </Stack>
                    </ListItem>
                  ))}
                  {i === activeChatIndex && (
                    <Stack
                      spacing={2}
                      component={'form'}
                      onSubmit={handleSubmit(data => onSubmit(data, () => submitMessageHandler(i)))}
                    >
                      <Controller
                        name='comment'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className='input'
                            ref={textAreaRef}
                            fullWidth
                            multiline
                            minRows={3}
                            // onChange={e => {
                            //   field.onChange(e.currentTarget.value)
                            // }}
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
                            error={!!errors.comment}
                            helperText={errors.comment ? 'Comment is required' : null}
                            FormHelperTextProps={{
                              classes: {
                                root: helperTextStyles.root
                              }
                            }}
                          />
                        )}
                      />
                      {/* <button onClick={() => submitMessageHandler(i)}>post</button> */}
                      <Button
                        className={`submit-btn ${styles.className}`}
                        size='medium'
                        type='submit'
                        variant='contained'
                        // onClick={() => }
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
      ) : (
        <Typography color={'red'} align='center'>
          Save Invoice to Review
        </Typography>
      )}
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
