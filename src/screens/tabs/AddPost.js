import { Image, StyleSheet,ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useRef,useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Theme_Color1, black, white } from '../../utils/Color'
import { Images } from '../../utils/Images'

const AddPost = ({navigation}) => {
    const[loading,setLoading]=useState(false)

    const [caption, setCaption] = useState('')
    const [imgData, setImgData] = useState({
        assets: [
            {
                "fileName": "",
                "height": 0,
                "type": "image/jpeg",
                "uri": "",
                "width": 0
            },
        ],
    })
    const ref=useRef()
    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) {
        } else {
            setImgData(result)
        }
        console.log(result)
    }
    
    const openCamera = async () => {
      const result = await launchCamera({ mediaType: 'photo' });
      setImgData(result)
      console.log(result)
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
         <Image source={Images.cross} style={[styles.icon,{marginLeft:20}]}/>
         </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.captionBox} onPress={()=>{ref.current.focus()}}>
           <TextInput ref={ref} value={caption} 
                      onChangeText={txt=>{setCaption(txt)}} 
                      style={styles.input} 
                      placeholderTextColor={'black'}
           placeholder='Type Caption here.....'/>
        </TouchableOpacity>

        <ScrollView>
          
        {imgData != null &&
        <View style={styles.SelectedView}>      
        <Image source={{uri :imgData.assets[0].uri}} style={[styles.SelectedImg,{}]}/>
        <TouchableOpacity style={styles.removeBtn} onPress={()=>{setImgData(null)}}>
        <Image source={Images.cross} style={[{tintColor:'red',width:20,height:20}]}/>
        </TouchableOpacity>
        </View>
        }

        <TouchableOpacity style={styles.pickerBtn} onPress={()=>{openCamera()}}>
            <Image source={Images.camera} style={styles.icon}/>
            <Text style={styles.pickerTxt}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerBtn} onPress={()=>{openGallery()}}>
            <Image source={Images.galeery} style={styles.icon}/>
            <Text style={styles.pickerTxt}>Open Gallery</Text>
        </TouchableOpacity>
        
        <TouchableOpacity disabled={caption=='' && imgData == null ?true:false} style={[styles.postBtn,{backgroundColor:caption.length<10 && imgData == null ? '#9e9e9e':Theme_Color1}]} onPress={()=>{}}>
            <Text style={styles.posTxt}>Post</Text>
        </TouchableOpacity>
        {/* <Loader visible={loading}/> */}
        </ScrollView>

    </View>
  )
}

export default AddPost

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:white
    },
    captionBox:{
        width:'94%',
        height:100,
        alignSelf:'center',
        borderWidth:0.4,
        marginTop:20,
        borderRadius:10,
        borderColor:'#9e9e9e',
    },
    input:{
        width:'100%',
        color:black,
        paddingLeft:10
    },
    SelectedView:{
      width:'90%',
      height:200,
      marginTop:20,
      borderRadius:1,
      alignSelf:"center"
    },
    SelectedImg:{
        width:'100%',
        height:'100%',
        borderRadius:10,
      },
    pickerBtn:{
        height:70,
        width:'90%',
        flexDirection:"row",
        borderBottomWidth:0.4,
        borderBottomColor:"9e9e9e",
        alignSelf:"center",
        alignItems:"center"
    },
    icon:{
        width:24,
        height:24,
        tintColor:"#9e9e9e"
    },
    pickerTxt:{
        marginLeft:10,
        color:"#9e9e9e"
    },
    profile:{
        height:70,
        width:'90%',
    },
    removeBtn:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:white,
        justifyContent:'center',
        alignItems:"center",
        position:"absolute",
        top:20,
        right:20
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
    },
    header:{
      width:'100%',
      height:70,
      justifyContent:'center'
    },
    
})