import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '../utils/Images'
import { black, white } from '../utils/Color'
import { moderateScale, scale } from 'react-native-size-matters'

const OptionModal = ({ onclick, onclose, visible }) => {
  return (
    <Modal visible={true} transparent onRequestClose={() => { onclose() }} visible={visible}>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', flex: 1 }}>
        <View style={styles.modalView}>
          <TouchableOpacity style={[styles.commonView,{marginTop:20}]} onPress={() => { onclick(1) }}>
            <Image source={Images.edit} style={[styles.icon]} />
            <Text style={styles.txt}>Edit Post</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.commonView,{}]} onPress={() => { onclick(1) }}>
            <Image source={Images.heartfill} style={[styles.icon]} />
            <Text style={styles.txt}>share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.commonView,{marginBottom:40}]} onPress={() => { onclick(2) }}>
            <Image source={Images.delete} style={[styles.icon]} />
            <Text style={styles.txt}>Delete Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default OptionModal

const styles = StyleSheet.create({
  icon: {
    width: scale(20),
    height: scale(20),
    tintColor: black,
    marginLeft: 15
  },
  commonView: {
    flexDirection: "row",
    width: "90%",
    height: scale(50),
    alignSelf: "center",
    alignItems: 'center',
    borderRadius: 10,
    // marginTop: 20,
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    // height: scale(200),
    bottom: 0,
    backgroundColor: white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  txt: {
    color: "#000",
    fontSize: moderateScale(14),
    marginLeft: 15
  }
})