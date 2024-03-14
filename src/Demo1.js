import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { black, white } from './utils/Color';

const App = () => {
const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  const handleAddValue = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    const currentDate = new Date();
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // This will show time in AM/PM format
    };
    const dateTimeString = currentDate.toLocaleString('en-US', options);
    console.log(dateTimeString);
   
    const newItem = { value: inputValue, timestamp:dateTimeString};
    console.warn(newItem)
    setData(prevData => [...prevData, newItem]);
    setInputValue('');
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.value}</Text>
      <Text>{item.timestamp}</Text>
    </View>
  );

  return(
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
      <TextInput value={inputValue}
        onChangeText={text => setInputValue(text)}
        style={styles.input} keyboardType='numeric'
        placeholderTextColor={'black'}
        placeholder='Type Caption here.....' />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity disabled={inputValue == '' ? true : false}
          onPress={() => handleAddValue('0-100')}
          style={[styles.btn, { backgroundColor: inputValue >= 10 && inputValue <= 100 ? 'purple' : '#9e9e9e' }]} >
          <Text style={styles.txt}>Button 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAddValue('101-200')}
          disabled={inputValue == '' ? true : false}
          style={[styles.btn, { backgroundColor: inputValue >= 101 && inputValue <= 200 ? 'red' : '#9e9e9e' }]} >
          <Text style={styles.txt}>Button 2</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => handleAddValue('201-300')}
          disabled={inputValue == '' ? true : false}
          style={[styles.btn, { backgroundColor: inputValue >= 201 && inputValue <= 300 ? 'black' : '#9e9e9e' }]} >
          <Text style={styles.txt}>Button 3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAddValue('301-400')}
          disabled={inputValue == '' ? true : false} 
          style={[styles.btn, { backgroundColor: inputValue >= 301 && inputValue <= 400 ? 'blue' : '#9e9e9e' }]} >
          <Text style={styles.txt}>Button 4</Text>
        </TouchableOpacity>

      </View>
      
      <View style={{marginTop:30}}>
      <Button title="Add(+)" onPress={handleButtonClick} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default App

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: '40%',
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginLeft: 20
  },
  container: {
    flex: 1,
    backgroundColor: white
  },
  input: {
    width: '90%',
    color: black,
    paddingLeft: 15,
    backgroundColor: white,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 8,
    borderColor: black,
    borderWidth: 0.5
  },
  txt: {
    color: white,
    fontSize: 20,
    fontWeight: '600'
  }
})
