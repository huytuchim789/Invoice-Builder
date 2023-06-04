import React, { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import { Grid } from '@mui/material'
import { Chat } from './Chat'
import { globalStore } from 'src/@core/hocs/global-store'

const Pixi = dynamic<any>(() => import('./Pixi').then(mod => mod.Pixi), {
  ssr: false
})

const InvoiceReview = () => {
  const [chatList, setChatList] = useState<
    {
      messages: {
        author: string
        createdAt: string
        message: string
        avatar_url: string
      }[]
      inputValue: string
      pin: { xRatio: number; yRatio: number } // 0 ~ 1
    }[]
  >([])
  const [activeChatIndex, setActiveChatIndex] = useState(0)
  const chatListRef = useRef(null)
  const activeItemRef = useRef(null)
  const textAreaRef = useRef(null)
  const { user } = globalStore((state: any) => state.userStore)
  console.log(chatList)

  const createNewChat = (position: { xRatio: number; yRatio: number }) => {
    const filteredState = chatList.filter(c => c.messages.length > 0)
    setChatList([
      ...filteredState,
      {
        messages: [],
        inputValue: '',
        pin: position
      }
    ])
    setActiveChatIndex(filteredState.length)
  }

  const updateMessageHandler = (value: string, index: number) => {
    setChatList(current => {
      const tmp = [...current]
      tmp[index].inputValue = value
      return tmp
    })
  }

  const submitMessageHandler = (index: number) => {
    if (chatList[index].inputValue === '') {
      return
    }
    const date = new Date()
    const tmp = [...chatList]
    tmp[index].messages.push({
      author: user?.name,
      createdAt: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      message: tmp[index].inputValue,
      avatar_url: user?.avatar_url
    })
    tmp[index].inputValue = ''
    setChatList(tmp)
    focusOnTextarea()
  }

  const pinList = useMemo(() => {
    return chatList.map(c => c.pin)
  }, [chatList])

  const clickPinHandler = (index: number) => {
    clearEmptyChats()
    setActiveChatIndex(index)
  }

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
    const filteredChatList = chatList.filter(c => c.messages.length > 0)
    setChatList(filteredChatList)
  }

  const focusOnTextarea = () => {
    const textareaRefCurrent = textAreaRef.current! as { focus: () => void }
    textareaRefCurrent.focus()
  }

  return (
    <Grid container spacing={6}>
      <Grid item lg={9}>
        <Pixi pins={pinList} addPin={createNewChat} clickPinHandler={clickPinHandler} />
      </Grid>
      <Grid item lg={3}>
        <Chat
          chatList={chatList}
          activeChatIndex={activeChatIndex}
          updateMessageHandler={updateMessageHandler}
          submitMessageHandler={submitMessageHandler}
          chatListRef={chatListRef}
          activeItemRef={activeItemRef}
          textAreaRef={textAreaRef}
        />
      </Grid>
    </Grid>
  )
}

export { InvoiceReview }
