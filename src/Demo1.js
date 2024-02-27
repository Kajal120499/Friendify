// import Slider from '@react-native-community/slider';
// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
// import { Theme_Color, Theme_Color1, black, white } from './utils/Color';
// import { Images } from './utils/Images';
// import LinearGradient from 'react-native-linear-gradient';

// const Demo1 = () => {
//     const [sliderValue, setSliderValue] = useState(0);

//     const onSliderValueChange = (value) => {
//         setSliderValue(Math.round(value));
//     };

//     return (
//         <LinearGradient colors={['#0B60B0', '#40A2E3']} style={styles.container}>
//             <Image source={Images.jalebii} style={{ width: '90%', height: 300, resizeMode: "stretch", alignSelf: "center", borderRadius: 10 }} />
//             <Text style={{ fontSize: 20, textAlign: 'center', color: white, marginTop: 40, fontWeight: '600' }}>Jalebi(Original Motion Picture)</Text>

//             <Text style={styles.text}>{sliderValue}</Text>

//             <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={1000}
//                 value={sliderValue}
//                 onValueChange={onSliderValueChange}
//             />

//             <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
//                 <Image source={Images.heartfill} style={{ width: 30, height: 30, tintColor: black }} />
//                 <Image source={Images.left} style={{ width: 30, height: 30 }} />
//                 <Image source={Images.play} style={{ width: 30, height: 30 }} />
//                 <Image source={Images.right} style={{ width: 30, height: 30 }} />
//             </View>

//             <TextInput
//                 style={styles.textInput}
//                 value={sliderValue.toString()}
//                 onChangeText={(text) => {
//                     const numericValue = parseInt(text);
//                     setSliderValue(isNaN(numericValue) ? 0 : numericValue);
//                 }}
//             />
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     slider: {
//         width: '90%',
//         marginTop: 30,
//         justifyContent: 'center',
//         alignSelf: 'center'

//     },
//     text: {
//         // marginBottom: 20,
//         textAlign:'right',
//         marginRight:30
//       },
// });

// export default Demo1;


import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SliderWithTextInput = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const incrementValue = () => {
    setSliderValue(prevValue => prevValue + 1);
  };

  const decrementValue = () => {
    setSliderValue(prevValue => prevValue - 1);
  };

  const onSliderChange = (value) => {
    setSliderValue(Math.round(value));
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={sliderValue}
        onValueChange={onSliderChange}
      />
      <TextInput
        style={styles.textInput}
        value={sliderValue.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setSliderValue(parseInt(text) || 0)}
      />
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={incrementValue} />
        <Button title="-" onPress={decrementValue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '80%',
    marginVertical: 20,
  },
  textInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default SliderWithTextInput;
