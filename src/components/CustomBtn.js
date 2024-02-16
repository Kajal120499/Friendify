import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Theme_Color, white,Theme_Color1 } from '../utils/Color'
import LinearGradient from 'react-native-linear-gradient'

const CustomBtn = ({title,onClick}) => {
  return (
    <LinearGradient colors={[Theme_Color,Theme_Color1]} style={styles.btn}>    
      <TouchableOpacity onPress={()=>{onClick()}}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
    </LinearGradient>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
    btn:{
        width:'90%',
        height:50,
        backgroundColor:Theme_Color,
        borderRadius:10,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    btnTxt:{
        color:white,
        fontSize:20,
        // fontWeight:''
    }
})