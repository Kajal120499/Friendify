import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme_Color, Theme_Color1, black, white } from '../../utils/Color'
import { Images } from '../../utils/Images'
import Feed from '../tabs/Feed'
import AddPost from '../tabs/AddPost'
import UserProfile from '../tabs/UserProfile'
import { scale, verticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'

const Dashboard = ({navigation}) => {
    const[selectedTab,setselectedTab]=useState(0)

    useEffect(()=>{
      getValue()
    },[])


    const getValue=async()=>{
      var getData = await AsyncStorage.getItem('data')
      var jsonConvert =JSON.parse(getData)
      // console.warn("===",jsonConvert._id)
    }

  return (
    <SafeAreaView style={styles.container}>
       {
        selectedTab==0?<Feed/>:selectedTab==1?<UserProfile/>:null
      }
     
      <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.bottomTab} onPress={()=>{setselectedTab(0)}}>
          <Image source={Images.home} style={[styles.icon,{tintColor:selectedTab==0?Theme_Color:black}]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTab} onPress={()=>{navigation.navigate("AddPost")}}>
          <Image source={Images.add} style={[styles.icon,{tintColor:black}]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTab} onPress={()=>{setselectedTab(1)}}>
          <Image source={Images.user} style={[styles.icon,{tintColor:selectedTab==1?Theme_Color:black}]}/>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:white
    },
    bottomNav:{
        position:'absolute',
        bottom:0,
        backgroundColor:'#f2f2f2',
        width:'100%',
        height:verticalScale(70),
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row'
    },
    bottomTab:{
        width:'25%',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    icon:{
        width:scale(25),
        height:scale(25)
    }
})