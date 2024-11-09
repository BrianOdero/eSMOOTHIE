import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const smoothies = () => {

    const {smoothieID,title,method} = useLocalSearchParams();


  return (
    <View style={styles.containor}>
        
      <Text>Title: {title}</Text>
      <Text>Method: {method}</Text>

      <TouchableOpacity>
      <View style={styles.submit}>
        <Text style={{color:'black'}}>Press here to update the smoothie </Text>
      </View>
     </TouchableOpacity>
    </View>
  )
}

export default smoothies

const styles = StyleSheet.create({
    submit:{
        borderColor:'black',
        borderWidth:2,
        width:250,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightblue',
        marginTop:10
    },
      containor:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        marginHorizontal:"auto"
      }

})