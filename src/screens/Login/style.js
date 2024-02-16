import { Dimensions, StyleSheet } from "react-native";
import { Theme_Color1, black, white } from "../../utils/Color";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";

export default StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center'
      },
      logo: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(10),
        resizeMode: 'contain',
        marginTop: Dimensions.get('window').height / 8
    },
      welcomeTxt1: {
        color: 'black',
        fontWeight: '500',
        fontSize: 30,
        alignSelf: "center",
        fontFamily:'Bebas Neue'
      },
      welcomeTxt2: {
        color: Theme_Color1,
      },
      SignupTxt: {
        color: black,
        fontWeight: '500',
        fontSize: 18,
        alignSelf: "center",
        marginTop:moderateVerticalScale(20)
     },
     signuo:{
        color: Theme_Color1,
        fontWeight: '500',
        fontSize: 18,
        marginLeft:moderateScale(18)
     },
     ErrorMsg:{
      color:'red',
      alignSelf:'flex-start',
      marginLeft:moderateScale(20),
      marginTop:3
     }
})