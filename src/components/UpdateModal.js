import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme_Color1, black, white } from '../utils/Color'
import { Images } from '../utils/Images'
import { moderateScale, scale } from 'react-native-size-matters'

const UpdateModal = ({onclick,onclose,visible,data}) => {
    // console.log("UpdateData:",data)
    const [caption, setCaption] = useState('')
    const [imageUrl, setimageUrl] = useState('')

     useEffect(()=>{
        setCaption(data&& data.caption ? data.caption : '')
        setimageUrl(data&& data.imageUrl ? data.imageUrl : '')
     },[visible])

  return (
    <Modal visible={true} transparent onRequestClose={()=>{onclose()}} visible={visible}>
      <View style={{backgroundColor:'rgba(0,0,0,0.2)',flex:1}}>
        <View style={{position:'absolute',
         width:'100%',height:'100%',bottom:0,backgroundColor:white}}>

       <TouchableOpacity style={{flexDirection:"row",width:"90%",height:scale(50),alignSelf:"center",alignItems:'center'}} onPress={()=>{onclose()}}>
       <Image source={Images.cross} style={[styles.icon]} />
       <Text style={{color:"#000",fontSize:moderateScale(16),marginLeft:15}}>Edit Post</Text>
       </TouchableOpacity>

       <View style={{borderWidth:1,borderRadius:10,borderColor:'#9e9e9e',alignSelf:'center',
         width:'90%',height:scale(60),backgroundColor:white}}>
            <TextInput placeholder='Enter' placeholderTextColor={black} value={caption} 
             onChangeText={txt=>setCaption(txt)} style={{color:black,paddingLeft:10}}/>
       </View>
       {
        imageUrl != '' && (
          <Image source={{uri:imageUrl}} style={{width:'90%',height:scale(200),alignSelf:"center",marginTop:50,opacity:0.5}}/>
        )
       }

       <TouchableOpacity style={[styles.postBtn,{backgroundColor:Theme_Color1}]} 
            onPress={()=>{onclick(caption)}}>
            <Text style={styles.posTxt}>Update Post</Text>
        </TouchableOpacity>
        </View>
      </View>
     </Modal>
  )
}

export default UpdateModal

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        tintColor: '#9e9e9e',
        marginLeft: 15
    },
    postBtn:{
      height:50,
      width:'90%',
      marginTop:20,
      alignItems:"center",
      justifyContent:"center",
      alignSelf:'center',
      borderRadius:10
  },
  posTxt:{
      color:white,
      fontSize:20,
      fontWeight:'600'
  }
})