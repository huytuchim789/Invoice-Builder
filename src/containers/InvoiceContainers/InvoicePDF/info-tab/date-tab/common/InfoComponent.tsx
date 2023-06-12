import { View, Text, StyleSheet } from '@react-pdf/renderer'

interface Props {
  title: string
  content: string
}

const style = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px'
  }
})

export const InfoPdfComponent = ({ title, content }: Props) => {
  return (
    <View style={style.content}>
      <Text style={{ fontSize: 15 }}>{title}</Text>
      <Text style={{ fontSize: 13 }}>{content}</Text>
    </View>
  )
}
