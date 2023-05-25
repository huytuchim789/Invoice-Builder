import { View, Text, StyleSheet } from '@react-pdf/renderer'

interface Props {
  title: string
  content: string
}

const style = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px'
  }
})

export const InfoComponent = ({ title, content }: Props) => {
  return (
    <View style={style.content}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14 }}>{content}</Text>
      </View>
    </View>
  )
}
