import { Image, ScrollView, styleheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { black, Theme_Color, Theme_Color1 } from '../../utils/Color'
import { Images } from '../../utils/Images'
import CustomTextInput from '../../components/CustomTextInput'
import CustomBtn from '../../components/CustomBtn'
import style from './style'
import { Base_Url, Register_url } from '../../utils/String'
import Loader from '../../components/Loader'

const Register = ({ navigation }) => {
  const nameField=useRef();
  const mailField=useRef();
  const phField=useRef();
  const passField=useRef();

  const [mail, setMail] = useState('Nirmal@gmail.com')
  const [pass, setPass] = useState('1234')
  const [ph, setPh] = useState('9878909878')
  const [name, setName] = useState('nirmal')

  const [wrongPh, setwWongdPh] = useState('')
  const [wrongName, setWrongName] = useState('')
  const [wrongMail, setWrongMail] = useState('')
  const [wrongpass, setWrongPass] = useState('')

  const [selectedGender, setselectedGender] = useState(0)
  
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (mail == '') {
      setWrongMail("Please Enter Mail")
    } else if (mail != '' && !mail.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      setWrongMail("Please Enter  Valid Mail")
    } else if (mail != '' && mail.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      setWrongMail("")
    }

    if (pass == '') {
      setWrongPass("Please Enter Password")
    } else if (pass != '' && pass.length < 4) {
      setWrongPass("Please Enter Valid Pass is minimum 6")
    } else if (pass != '' && pass.length > 4) {
      setWrongPass("")
    }

    if (ph == '') {
      setwWongdPh("Please Enter Phone Number")
    } else if (ph != '' && ph.length < 10) {
      setwWongdPh("Please Enter Valid Pass is minimum 10")
    } else if (ph != '' && ph.length > 6) {
      setwWongdPh("")
    }

    if (name == '') {
      setWrongName("Please Enter Name")
    } else if (name != '' && name.length < 3) {
      setWrongName("Please Enter Valid Name is minimum 3")
    } else if (name != '' && name.length > 3) {
      setWrongName("")
    }

  }

  const RegisterApiCall=()=>{
    setLoading(true)
    const data=JSON.stringify({
        username:name,
        emailId:mail,
        mobile:ph,
        gender:selectedGender==0?'male':'female',
        password:pass,
    })
    fetch(Base_Url+Register_url,{
      method:'post',
      body:data,
      headers:{
        "Content-Type": "application/json"
      },
    }).then(res=>res.json())
      .then(json=>{
        setLoading(false)
        if(json){
           navigation.navigate("Dashboard")
        }
        console.warn(json)})
      .catch(err=>{
        setLoading(false)
        console.warn(err)})
  }

  return (
    <View style={style.conatiner}>
      <ScrollView>
      <Image source={Images.appLogo} style={style.logo} />
      <Text style={[style.welcomeTxt1, { marginTop: 20 }]}>Create an <Text style={{color: Theme_Color1}}>Account</Text></Text>

      <CustomTextInput placeholder={'Enter Name'}
        value={name}
        onChangeText={txt => {
          // mailField.current.focus()
          setName(txt) }}
        isValid={wrongName == '' ? true : false}
        icon={Images.user} 
        title={'Name'}
        ref={nameField}
        returnKeyType={'next'}
        // onSubmitEditing={()=>{
          // mailField.current.focus()
          // console.warn("hhhhr")
        // }}
        />
      {
        wrongName != '' && (<Text style={style.ErrorMsg}>{wrongName}</Text>)
      }

      <CustomTextInput placeholder={'Enter Mail'}
        value={mail}
        onChangeText={txt => { setMail(txt) }}
        isValid={wrongMail == '' ? true : false}
        icon={Images.mail}
        title={'Mail'}
        />
      {
        wrongMail != '' && (<Text style={style.ErrorMsg}>{wrongMail}</Text>)
      }
      
      <Text style={style.heading}>Select Gender</Text>
        <View style={style.genderView}>
          <TouchableOpacity style={[style.genderBtn, { borderColor: selectedGender == 0 ? Theme_Color1 : black }]} onPress={() => { setselectedGender(0) }}>
            <Image source={Images.male} style={[style.icon, { tintColor: selectedGender == 0 ? Theme_Color1 : black }]} />
          </TouchableOpacity>
          <TouchableOpacity style={[style.genderBtn, { borderColor: selectedGender == 1 ? Theme_Color1 : black }]} onPress={() => { setselectedGender(1) }}>
            <Image source={Images.female} style={[style.icon, { tintColor: selectedGender == 1 ? Theme_Color1 : black }]} />
          </TouchableOpacity>
        </View>

      <CustomTextInput placeholder={'Enter Phone Number'}
        value={ph}
        onChangeText={txt => { setPh(txt) }}
        isValid={wrongPh == '' ? true : false}
        icon={Images.call} 
        title={'Mobile'}
        />

      {
        wrongPh != '' && (<Text style={style.ErrorMsg}>{wrongPh}</Text>)
      }

      <CustomTextInput placeholder={'Enter Password'}
        value={pass}
        onChangeText={txt => { setPass(txt) }}
        keyboardType={'numeric'}
        isValid={wrongpass == '' ? true : false}
        icon={Images.lock} 
        title={'Password'}
        />

      {
        wrongpass != '' && (<Text style={style.ErrorMsg}>{wrongpass}</Text>)
      }

      <CustomBtn title={'Register'} onClick={() => {
      if(validate){
        RegisterApiCall()
      }
      }} />

      <Text style={[style.SignupTxt, {}]} onPress={() => { navigation.goBack()}}>Already have an Account ?
        <Text style={[style.signuo, {}]}> Login</Text></Text>
      
      <Loader visible={loading}/>
        </ScrollView>
    </View>
  )
}

export default Register


