import { Image, SafeAreaView, styleheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Theme_Color, Theme_Color1 } from '../../utils/Color'
import { Images } from '../../utils/Images'
import CustomTextInput from '../../components/CustomTextInput'
import CustomBtn from '../../components/CustomBtn'
import style from './style'
import { Base_Url, login_url } from '../../utils/String'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'
import LinearGradient from 'react-native-linear-gradient'

const Login = ({ navigation }) => {
  const [mail, setMail] = useState('mamta@gmail.com')
  const [pass, setPass] = useState('mamta@')

  const [wrongMail, setWrongMail] = useState('')
  const [wrongpass, setWrongPass] = useState('')

  const [logingetData, setDataGetData] = useState([])

  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      const loginData = JSON.stringify(logingetData)
      console.warn("...", loginData)
      await AsyncStorage.setItem("data", loginData)
      navigation.navigate("Dashboard")
    } catch (error) {
      console.error('Error setting array in AsyncStorage:', error);
    }
  }

  const validate = () => {
    if (mail == '') {
      setWrongMail("Please enter Maiil")
    } else if (mail != '' && !mail.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      setWrongMail('Please enter Valid Mail')
    } else {
      setWrongMail('')
    }

    if (pass == '') {
      setWrongPass("Please Enter Password")
    } else if (pass != '' && pass.length < 4) {
      setWrongPass("Please Enter Valid Pass is minimum 6")
    } else if (pass != '' && pass.length > 4) {
      setWrongPass("")
    }
  }

  const loginApiCall = () => {
    setLoading(true)
    const data = JSON.stringify({
      emailId: mail,
      password: pass
    })
    fetch(Base_Url + login_url, {
      method: 'post',
      body: data,
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
      .then(json => {
        setLoading(false)
        var Data = json.data
        // console.warn("////",Data)
        setDataGetData(Data)
        if(!json.status){
        if(json.message=='Wrong password '){
          setWrongPass(json.message)
        }else{
          setWrongMail(json.message)
        }
      }else{
        getData()
      }
      })
      .catch(err => {
        setLoading(false)
        console.warn(err)
      })
  }

  return (
    <SafeAreaView style={style.conatiner}>
      <Image source={Images.appLogo} style={style.logo} />
      <Text style={[style.welcomeTxt1, { marginTop: 20 }]}>Welcome to</Text>
      <Text style={[style.welcomeTxt1, { color: Theme_Color1 }]}> Friendify</Text>

      <CustomTextInput placeholder={'Enter mail'}
        value={mail}
        onChangeText={txt => { setMail(txt) }}
        isValid={wrongMail == '' ? true : false}
        icon={Images.mail}
        title="Mail"
      />
      {
        wrongMail != '' && (<Text style={style.ErrorMsg}>{wrongMail}</Text>)
      }

      <CustomTextInput placeholder={'Enter Password'}
        value={pass}
        onChangeText={txt => { setPass(txt) }}
        keyboardType={'numeric'}
        isValid={wrongpass == '' ? true : false}
        icon={Images.lock}
        title="Password"
      />
      {
        wrongpass != '' && (<Text style={style.ErrorMsg}>{wrongpass}</Text>)
      }

      <CustomBtn title={'Login'} onClick={() => {
        // if (validate()) {
          loginApiCall()
        // }
      }} />

      <Text style={[style.SignupTxt, {}]} onPress={() => { navigation.navigate("Register") }}>Create New Account ?
        <Text style={[style.signuo, {}]}> Signup</Text></Text>

      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default Login
