import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Theme_Color1, black, white } from '../utils/Color'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'

const CustomTextInput = ({title,placeholder,value,onChangeText,keyboardType,isValid,icon,returnKeyType,onSubmitEditing}) => {
  return (
    <View style={[styles.inputView,{borderColor:isValid?'#9e9e9e':'red'}]}>
      {
        icon && (
          <Image source={icon} style={styles.icon}/>
        )
      }
      <Text style={styles.title}>{title}<Text style={{color:'red'}}> *</Text></Text>
        <TextInput placeholder={placeholder} 
                   placeholderTextColor={'gray'} 
                   style={styles.input}
                   value={value}
                   returnKeyType={returnKeyType}
                   onChangeText={txt=>{onChangeText(txt)}}
                   onSubmitEditing={()=>{onSubmitEditing}}
                   keyboardType={keyboardType?keyboardType:'default'}/>
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputView:{
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        height:verticalScale(50),
        backgroundColor:white,
        borderWidth:moderateScale(0.4),
        borderColor:'gray',
        borderRadius:moderateScale(8),
        marginTop:moderateVerticalScale(20),
        alignSelf:'center',
        alignItems:'center',
    },
    input:{
        // paddingLeft:15,
        color:black,
        // backgroundColor:'red'
    },
    icon:{
      width:scale(20),
      height:scale(20),
      marginHorizontal:8,
      tintColor:Theme_Color1,
      // backgroundColor:"blue"
  },
  title:{
    alignSelf:'flex-start',
    marginLeft:moderateScale(20),
    top:-moderateVerticalScale(8),
    backgroundColor:white,
    position:'absolute',
    paddingLeft:moderateScale(10),
    paddingRight:moderateScale(10),
    color:Theme_Color1,
    fontFamily:'Glober'
  }
})