import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { white, black, Theme_Color1, Theme_Color } from '../../utils/Color'
import FeedItem from '../../components/FeedItem'
import { Base_Url, Feeds, delete_post, like_post, update_post } from '../../utils/String'
import { useIsFocused } from '@react-navigation/native'
import { Images } from '../../utils/Images'
import { scale } from 'react-native-size-matters'
import OptionModal from '../../components/OptionModal'
import UpdateModal from '../../components/UpdateModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Feed = () => {
  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(false)
  
  const[openModal , setOpenModal] = useState(false)
  const[openupdateModal , setOpenUpdateModal] = useState(false)
   
  const[selectedItem,setselectedItem]=useState(null)
  const[asyncGetData,setAsyncGetData]=useState([])

 
  const isFocused = useIsFocused()
  useEffect(() => {
    getPost()
  }, [isFocused])
 
  const getAsyncData=async()=>{
    const getValue = await AsyncStorage.getItem("data")
    const jsonConverter = JSON.parse(getValue)
    console.warn("Feeed",jsonConverter._id)
    setAsyncGetData(jsonConverter)
    updatePost()
  }
  const getPost = () => {
    setLoading(true)
    fetch(Base_Url + Feeds)
      .then(res => res.json())
      .then(json => {
        // console.warn(json.data)
        setLoading(false)
        setFeed(json.data.reverse())
      })
      .catch(err => {
        setLoading(false)
        console.warn(err)
      })
  }

  const deletePost = () => {
    const url = Base_Url + delete_post + '/'+ selectedItem._id
    console.warn(url)
    setLoading(true)
    fetch(Base_Url+delete_post+'/'+selectedItem._id,{
      method:'delete'
    })
    .then(res=>res.json())
    .then(json=>{
      console.warn("DEl:",json)
      setLoading(false)
      getPost()
    }).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }

  const updatePost = caption => {
    setLoading(true)
    const body=JSON.stringify({
        "userId": asyncGetData._id,
        "username":asyncGetData.username,
        "caption": caption
    })
    console.warn("Body here print",body)
    const myHeader = new Headers()
    myHeader.append("Content-Type", "application/json")
    fetch(Base_Url+update_post+'/'+ asyncGetData._id,{
      method: 'put',
      body,
      headers: myHeader
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        console.warn(json)
        getPost()
      }).catch(err => {
        console.warn(err)
      })


  }

  const likePost = (item) => {
    // const url = Base_Url+like_post+'/'+ item._id
    // console.warn(url)
    setLoading(true)
    const body=JSON.stringify({
        "userId": item._id,
    })
    console.warn("Body here print",body)
    const myHeader = new Headers()
    myHeader.append("Content-Type", "application/json")
    fetch(Base_Url+like_post+'/'+ item._id,{
      method: 'put',
      body,
      headers: myHeader
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        console.warn("Like data",json)
        getPost()
      }).catch(err => {
        console.warn(err)
      })
  }

  return (
    <View style={styles.conatiner}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 20 }}>
        <Text style={styles.title}>Friendify</Text>
        <Image source={Images.msg} style={[styles.icon, { tintColor: Theme_Color }]} />
      </View>

      <FlatList data={feed} style={{}} renderItem={({ item, index }) => {
        return (
          <FeedItem data={item} 
                    list={feed} 
                    index={index} 
                    onclickLike={()=>{likePost(item)}}
                    onClickOption={()=>{ setselectedItem(item)
                                         setOpenModal(true)}}
                    />
        )
      }} />

      <OptionModal onclose={()=>{setOpenModal(false)}} onclick={x=>{
                                                            setOpenModal(false);
                                                            if(x==2){
                                                              deletePost()
                                                            }else{
                                                              setOpenUpdateModal(true) 
                                                            }
                                                            }} visible={openModal}/>

      <UpdateModal  visible={openupdateModal} 
                    data={selectedItem}
                    onclose={()=>{setOpenUpdateModal(false)}} 
                    onclick={()=>{
                             setOpenUpdateModal(false)
                             getAsyncData()
                             }}/>                                                      

      <Loader visible={loading} />

    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: white
  },
  title: {
    fontSize: 25,
    color: Theme_Color1,
    fontWeight: '700',
    fontFamily: 'Bebas Neue'
  },
  icon: {
    width: scale(25),
    height: scale(25)
  }
})