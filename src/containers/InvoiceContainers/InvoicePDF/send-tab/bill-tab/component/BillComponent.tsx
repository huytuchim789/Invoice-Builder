import { View, Text, StyleSheet } from '@react-pdf/renderer'

interface Props {
  title: string
  content: string
}

const style = StyleSheet.create({
  content: {
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
    gap: '20px'
  }
})

export const BillComponent = ({ title, content }: Props) => {
  return (
    <View style={style.content}>
      <View>
        <Text style={{ fontSize: 16 }}>{title}:</Text>
      </View>
      <View>
        <Text style={{ fontSize: 14 }}>{content}</Text>
      </View>
    </View>
  )
}
