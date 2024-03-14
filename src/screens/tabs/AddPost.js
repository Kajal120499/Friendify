import { Image, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Theme_Color1, black, white } from '../../utils/Color'
import { Images } from '../../utils/Images'
import Loader from '../../components/Loader'
import { Base_Url, add_post } from '../../utils/String'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage';

const AddPost = ({ navigation }) => {
    // useEffect(()=>{
    //     getAyncData()
    // },[])

    const [loading, setLoading] = useState(false)
    const[logingetData,setDataGetData]=useState([])

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
    const ref = useRef()
    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) {
        } else {
            setImgData(result)
        }
        // console.log(result)
    }

    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        setImgData(result)
        //   console.log(result)
    }
    
    const getAyncData=async()=>{
       const getData=await AsyncStorage.getItem("data")
        const jsonConvert= JSON.parse(getData) 
        console.warn("-------",jsonConvert._id)
        setDataGetData(jsonConvert)
        UploadImage()
    }

    const UploadImage = async () => {
        setLoading(true)
        let url = ''
        if (imgData != null) {
            const reference = storage().ref(imgData.assets[0].fileName);
            // path to existing file on filesystem
            const pathToFile = imgData.assets[0].uri;
            // uploads file
            await reference.putFile(pathToFile);
            //url
            url = await storage().ref(imgData.assets[0].fileName).getDownloadURL();
        }
        let body = JSON.stringify({
            "user": logingetData._id,
            "caption": caption,
            "imageUrl":url
        })
        // console.warn("Body",body)
        const urll = Base_Url + add_post
        // console.warn(urll)
        fetch(urll, {
            body:body,
            method:'post',
            headers: {
                "Content-Type": "application/json"
              },
        }).then(
         res=>res.json()).
         then(json=>{
            setLoading(false)
            console.log("Data",json)
            navigation.navigate("Dashboard")
        }).catch(err=>{
            setLoading(false)
            console.warn("Error",err)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={Images.cross} style={[styles.icon, { marginLeft: 20 }]} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.captionBox} onPress={() => { ref.current.focus() }}>
                <TextInput ref={ref} value={caption}
                    onChangeText={txt => { setCaption(txt) }}
                    style={styles.input}
                    placeholderTextColor={'black'}
                    placeholder='Type Caption here.....' />
            </TouchableOpacity>

            <ScrollView>

                {imgData != null &&
                    <View style={styles.SelectedView}>
                        <Image source={{ uri: imgData.assets[0].uri }} style={[styles.SelectedImg, {}]} />
                        {/* <TouchableOpacity style={styles.removeBtn} onPress={()=>{setImgData(null)}}>
        <Image source={Images.cross} style={[{tintColor:'red',width:20,height:20}]}/>
        </TouchableOpacity> */}
                    </View>
                }

                <TouchableOpacity style={styles.pickerBtn} onPress={() => { openCamera() }}>
                    <Image source={Images.camera} style={styles.icon} />
                    <Text style={styles.pickerTxt}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pickerBtn} onPress={() => { openGallery() }}>
                    <Image source={Images.galeery} style={styles.icon} />
                    <Text style={styles.pickerTxt}>Open Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={caption == '' ? true : false} style={[styles.postBtn, { backgroundColor: caption.length < 10 ? '#9e9e9e' : Theme_Color1 }]} onPress={() => {getAyncData()}}>
                    <Text style={styles.posTxt}>Post</Text>
                </TouchableOpacity>
                <Loader visible={loading} />
            </ScrollView>

        </View>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    captionBox: {
        width: '94%',
        height: 100,
        alignSelf: 'center',
        borderWidth: 0.4,
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#9e9e9e',
    },
    input: {
        width: '100%',
        color: black,
        paddingLeft: 10
    },
    SelectedView: {
        width: '90%',
        height: 200,
        marginTop: 20,
        borderRadius: 1,
        alignSelf: "center"
    },
    SelectedImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    pickerBtn: {
        height: 70,
        width: '90%',
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderBottomColor: "9e9e9e",
        alignSelf: "center",
        alignItems: "center"
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#9e9e9e"
    },
    pickerTxt: {
        marginLeft: 10,
        color: "#9e9e9e"
    },
    profile: {
        height: 70,
        width: '90%',
    },
    removeBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: "center",
        position: "absolute",
        top: 20,
        right: 20
    },
    postBtn: {
        height: 50,
        width: '90%',
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        borderRadius: 10
    },
    posTxt: {
        color: white,
        fontSize: 20,
        fontWeight: '600'
    },
    header: {
        width: '100%',
        height: 70,
        justifyContent: 'center'
    },

})