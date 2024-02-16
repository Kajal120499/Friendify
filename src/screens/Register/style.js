import { Dimensions, StyleSheet } from "react-native";
import { Theme_Color1, black, white } from "../../utils/Color";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: white,
      },
      heading:{
         color:black,
         marginTop:moderateScale(20),
         marginLeft:30,
         fontWeight:'700'
      },
      logo: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(10),
        resizeMode: 'contain',
        marginTop: Dimensions.get('window').height / 8,
        alignSelf:'center'
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
        marginTop: moderateScale(20),
        paddingBottom:20
     },
     signuo:{
        color: Theme_Color1,
        fontWeight: '500',
        fontSize: 18,
        marginLeft:moderateScale(20),
        paddingBottom:20
     },
     ErrorMsg:{
      color:'red',
      alignSelf:'flex-start',
      marginLeft:moderateScale(20),
      marginTop:moderateScale(3)
     },
     genderView:{
        width:'90%',
        flexDirection:'row',
        marginTop:moderateScale(20),
        justifyContent:"space-evenly",
        alignSelf:"center"
       },
       genderBtn:{
        width:'40%',
        height:verticalScale(100),
        borderWidth:1,
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignItems:'center'
       },
       icon:{
        width:scale(40),
        height:scale(40),
        resizeMode:"contain"
       }
})