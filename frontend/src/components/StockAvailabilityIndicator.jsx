import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StockAvailabilityIndicator = ({ stockData }) => {
  const calculateStockAvailability = (data) => {
    const totalProducts = data.length;
    const inStockCount = data.filter(product => product['Stock Available'] === 'True').length;
    const inStockPercentage = (inStockCount / totalProducts) * 100;
    return inStockPercentage.toFixed(2);
  };

  const inStockPercentage = calculateStockAvailability(stockData);

  return (
    
      <Text style={[styles.text, { fontWeight: 'bold', color: 'green' }]}>
        ({inStockPercentage}% in stock)
      </Text>
    
  );
};

const styles = StyleSheet.create({
  container: {
    // height:20,
    // width:"20%",
    backgroundColor:"blue",
   
  },
  text: {
    // height:"100%",

    paddingRight:10,
    fontSize: 13.5,
    color: '#333',
  },
});

export default StockAvailabilityIndicator;