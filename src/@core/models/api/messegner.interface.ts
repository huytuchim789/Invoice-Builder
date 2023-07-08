export interface IMessengerResponse {
  data: Daum[]
  message: string
}

export interface Daum {
  id: string
  createdAt: string
  lastMessageAt: string
  name: any
  isGroup: any
  messagesIds: any[]
  userIds: string[]
  users: User[]
  messages: Message[]
}

export interface User {
  id: string
  name: string
  email: string
  emailVerified: any
  image: string
  hashedPassword: any
  createdAt: string
  updatedAt: string
  conversationIds: string[]
  seenMessageIds: string[]
  isOnline?: boolean
}

export interface Message {
  id: string
  body: string
  image: any
  createdAt: string
  seenIds: string[]
  conversationId: string
  senderId: string
  sender: Sender
  seen: Seen[]
}

export interface Sender {
  id: string
  name: string
  email: string
  emailVerified: any
  image: string
  hashedPassword: any
  createdAt: string
  updatedAt: string
  conversationIds: string[]
  seenMessageIds: string[]
  isOnline?: boolean
}

export interface Seen {
  id: string
  name: string
  email: string
  emailVerified: any
  image: string
  hashedPassword: any
  createdAt: string
  updatedAt: string
  conversationIds: string[]
  seenMessageIds: string[]
  isOnline?: boolean
}
