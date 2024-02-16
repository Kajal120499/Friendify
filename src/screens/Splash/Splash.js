import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { white } from '../../utils/Color'
import { Images } from '../../utils/Images'
import { scale } from 'react-native-size-matters'

const Splash = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("Login")
    },3000)
  })
  return (
    <View style={styles.conatiner}>
      <Image source={Images.appLogo} style={styles.logo}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor:white,
    justifyContent:'center',
    alignItems:"center"
  },
  logo:{
    width:scale(200),
    height:scale(200),
    borderRadius:scale(100),
    resizeMode:"contain"
  }
})