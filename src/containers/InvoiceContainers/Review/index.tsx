import React, { useEffect, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'

import { Grid } from '@mui/material'
import { Chat } from './Chat'
import { FormProvider, useForm } from 'react-hook-form'
import { useReviewStore } from './store'
import { useRouter } from 'next/router'
import { useReviewController } from './controller'

const Pixi = dynamic<any>(() => import('./Pixi').then(mod => mod.Pixi), {
  ssr: false
})

const InvoiceReview = () => {
  const router = useRouter()
  const { chatList, setChatList, activeChatIndex, setActiveChatIndex } = useReviewStore()
  const { onAddComment, getListPins } = useReviewController()
  const chatListRef = useRef(null)
  const activeItemRef = useRef(null)
  const textAreaRef = useRef(null)
  const form = useForm()
  const inputValue = form.watch('comment')
  const createNewChat = ({ xRatio, yRatio }: { xRatio: number; yRatio: number }) => {
    const filteredState = chatList.filter(c => c.comments.length > 0)
    setChatList([
      ...filteredState,
      {
        comments: [],
        coordinate_X: xRatio,
        coordinate_Y: yRatio
      }
    ])
    setActiveChatIndex(filteredState.length)
  }

  const submitMessageHandler = (index: number) => {
    if (inputValue === '') {
      return
    }
    const tmp = [...chatList]

    if (router.query.id) {
      onAddComment({
        number: index,
        invoice_id: router.query.id as string,
        message: inputValue,
        pin: {
          xRatio: tmp[index].coordinate_X,
          yRatio: tmp[index].coordinate_Y
        }
      })
      form.reset({ comment: '' })
    }
    focusOnTextarea()
  }

  const pinList = useMemo(() => {
    return chatList.map(c => {
      return { xRatio: c.coordinate_X, yRatio: c.coordinate_Y }
    })
  }, [chatList])

  const clickPinHandler = (index: number) => {
    clearEmptyChats()
    setActiveChatIndex(index)
  }

  useEffect(() => {
    if (router.query.id && router.isReady) getListPins(router.query.id as string)
  }, [router.isReady, router.query.id])

  useEffect(() => {
    if (!activeItemRef.current) {
      return
    }
    const chatListRefCurrent = chatListRef.current! as { scrollTop: number }
    const activeRefCurrent = activeItemRef.current! as { offsetTop: number }
    chatListRefCurrent.scrollTop = activeRefCurrent.offsetTop - 54
    focusOnTextarea()
  }, [activeChatIndex])

  const clearEmptyChats = () => {
    const filteredChatList = chatList.filter(c => c.comments.length > 0)
    setChatList(filteredChatList)
  }

  const focusOnTextarea = () => {
    const textareaRefCurrent = textAreaRef.current! as { focus: () => void }
    textareaRefCurrent.focus()
  }

  return (
    <FormProvider {...form}>
      <Grid container spacing={6}>
        <Grid item lg={9}>
          <Pixi pins={pinList} addPin={createNewChat} clickPinHandler={clickPinHandler} />
        </Grid>
        <Grid item lg={3}>
          <Chat
            submitMessageHandler={submitMessageHandler}
            chatListRef={chatListRef}
            activeItemRef={activeItemRef}
            textAreaRef={textAreaRef}
          />
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export { InvoiceReview }
