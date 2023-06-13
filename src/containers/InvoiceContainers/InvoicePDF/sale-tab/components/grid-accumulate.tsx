import { View, Text, StyleSheet } from '@react-pdf/renderer'

interface Props {
  title: string
  content: string
  isTotal?: boolean
}

export const GridPrdComponent = ({ title, content, isTotal }: Props) => {
  const style = StyleSheet.create({
    content: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderTop: isTotal ? '1px solid #000' : 'none',
      paddingTop: isTotal ? '10px' : 0
    }
  })

  return (
    <View style={style.content}>
      <Text style={{ fontSize: 15, flex: 1 }}>{title}</Text>
      <Text style={{ fontSize: 13, flex: 1 }}>{content}</Text>
    </View>
  )
}
