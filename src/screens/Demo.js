// import React from 'react';
// import { View, Text, FlatList } from 'react-native';

// const Demo
//  = () => {
//   // Color sequence
//   const colors = ['red', 'blue', 'pink'];
  
//   // Function to repeat the color sequence
//   const getColor = (index) => {
//     return colors[index % colors.length];
//   };

//   // Generate list data
//   const data = [];
//   for (let i = 0; i < 10; i++) {
//     data.push({ key: i.toString(), color: getColor(i) });
//   }

//   // Render item component
//   const renderItem = ({ item }) => (
//     <View style={{ padding: 10,margin:10,width:'70%',alignSelf:'center',backgroundColor: item.color }}>
//       <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{item.color}</Text>
//     </View>
//   );

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.key}
//     />
//   );
// };

// export default Demo;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarPattern = () => {
  // Number of rows for the pattern
  const numRows = 5;

  // Define dark and light colors
  const darkColor = 'green';
  const lightColor = 'red';

  // Array to hold the rows
  const rows = [];

  // Loop to create rows
  for (let i = 0; i < numRows; i++) {
    // Array to hold the cells in each row
    const cells = [];

    // Loop to create spaces before stars
    for (let j = 0; j < numRows - i - 1; j++) {
      cells.push(<View key={j} style={styles.cell}></View>);
    }

    // Loop to create stars
    for (let k = 0; k <= i; k++) {
      // Determine the color based on the sum of row and column index
      const color = (i + k) % 2 === 0 ? darkColor : lightColor;
      cells.push(<Text key={k} style={[styles.star, { color: color }]}>*</Text>);
    }

    // Create row component with cells
    const row = <View key={i} style={styles.row}>{cells}</View>;
    rows.push(row);
  }

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 15,
    height: 15,
  },
  star: {
    fontSize: 30,
  },
});

export default StarPattern;


