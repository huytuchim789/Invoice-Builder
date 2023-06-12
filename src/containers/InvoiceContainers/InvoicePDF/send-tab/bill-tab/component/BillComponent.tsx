import { View, Text, StyleSheet } from '@react-pdf/renderer'

interface Props {
  title: string
  content: string
}

const style = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export const BillComponent = ({ title, content }: Props) => {
  return (
    <View style={style.content}>
      <Text style={{ fontSize: 15, flex: 1 }}>{title}</Text>
      <Text style={{ fontSize: 13, flex: 1 }}>{content}</Text>
    </View>
  )
}
