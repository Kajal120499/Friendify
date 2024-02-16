import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = ({visible}) => {
  return (
   <Modal style={{flex:1}} visible={visible} transparent={true} >
    <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:"center",backgroundColor:'rgba(0,0,0,0.5)'}}>
       <View style={{width:50,borderRadius:10,justifyContent:'center',alignItems:'center',height:50}}></View>
       <ActivityIndicator size={'large'}/>
    </View>

   </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({})