import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { white, black, Theme_Color1, Theme_Color } from '../../utils/Color'
import FeedItem from '../../components/FeedItem'
import { Base_Url, Feeds } from '../../utils/String'
import { useIsFocused } from '@react-navigation/native'
import { Images } from '../../utils/Images'
import { scale } from 'react-native-size-matters'

const Feed = () => {
  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(false)

  const isFocused = useIsFocused()
  useEffect(() => {
    getPost()
  }, [isFocused])

  const getPost = () => {
    setLoading(true)
    fetch(Base_Url + Feeds)
      .then(res => res.json())
      .then(json => {
        // console.warn(json.data)
        setLoading(false)
        setFeed(json.data)
      })
      .catch(err => {
        setLoading(false)
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
          <FeedItem data={item} list={feed} index={index} />
        )
      }} />

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