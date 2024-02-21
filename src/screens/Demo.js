import React from 'react';
import { View, Text, FlatList } from 'react-native';

const Demo = () => {
  // Color sequence
  const colors = ['red', 'blue', 'pink'];
  
  // Function to repeat the color sequence
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  // Generate list data
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({ key: i.toString(), color: getColor(i) });
  }

  // Render item component
  const renderItem = ({ item }) => (
    <View style={{ padding: 10,margin:10,width:'70%',alignSelf:'center',backgroundColor: item.color }}>
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{item.color}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
    />
  );
};

export default Demo;
