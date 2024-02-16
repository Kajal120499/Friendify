import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../utils/Images'
import { black } from '../utils/Color'
import { timeAgo } from './time'

const FeedItem = ({data,list,index}) => {
  const navigation=useNavigation()
  // console.warn(data)
  const [postTime, setPostTime] = useState('');

  useEffect(() => {
    const upd = timeAgo(data.createdAt);
    setPostTime(upd); // Initial time ago string
    const timer = setInterval(() => {
      const calculatedTime = timeAgo(data.createdAt);
      setPostTime(calculatedTime); // Update time every minute
    }, 6000);

    return () => {
      clearInterval(timer); // Cleanup interval on component unmount
    };
  }, [data.createdAt]);

  return (
    <View style={[styles.feed,{marginBottom:list.length-1==index?100:0}]}>
          <View style={styles.topView}>
          <View style={styles.topLeft}>
            <Image source={Images.user} style={{width:20,height:20,marginLeft:10}}/>
            <Text style={styles.username}>{data.username}</Text>
          </View>
          <TouchableOpacity onPress={()=>{onClickOption()}}>
          <Image source={Images.dot} style={{width:20,height:20,marginRight:10}}/>
          </TouchableOpacity>
          </View>
          <Text style={styles.time}>{postTime}</Text>
          <Text style={styles.caption}>{data.caption}</Text>
          {
            data.imageUrl != '' && (
              <Image source={{uri:data.imageUrl}} style={{width:'90%',height:200,alignSelf:'center',marginTop:20,borderRadius:10}}/>
            )
          }

          <View style={styles.bottomView}>
            <TouchableOpacity style={{}} onPress={()=>{onClickLike()}}>
            <Image source={Images.like} style={{width:24,height:24,marginLeft:10,tintColor:'red'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Comments",{id:data._id})}}>
          <Image source={Images.comment} style={{width:24,height:24,marginLeft:20}}/>
          </TouchableOpacity>
          </View>

          <Text style={styles.like}>{data.likes.length +' '+'likes'}</Text>
          <Text style={styles.comments}>{data.comments.length +' '+'View all comment'}</Text>

    </View>
  )
}

export default FeedItem

const styles = StyleSheet.create({
  feed:{
    width:'90%',
    // height:200,
    paddingBottom:20,
    backgroundColor:'#f2f2f2',
    marginTop:20,
    alignSelf:'center',
    borderRadius:10
  },
  topView:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20
  },
  topLeft:{
    flexDirection:"row",
    // backgroundColor:"red"
  },
  username:{
    fontWeight:"600",
    // marginTop:10,
    fontSize:18,
    color:black,
    marginLeft:10
  },
  like:{
    fontWeight:"600",
    marginTop:5,
    fontSize:14,
    color:black,
    marginLeft:20
  },
  comments:{
    // fontWeight:"600",
    marginTop:5,
    fontSize:14,
    color:'gray',
    marginLeft:20
  },
  time:{
    // fontWeight:"600",
    // marginTop:10,
    fontSize:14,
    color:black,
    marginLeft:20
  },
  caption:{
    width:'90%',
    alignSelf:'center',
    marginTop:10,
    fontSize:16,
    color:black,
    // backgroundColor:"red"
  },
  bottomView:{
    width:'90%',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:10,
    // backgroundColor:'red',
    marginTop:20
  }
})