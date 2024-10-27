import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import stockData from '../../assets/stock.json';
import pincodeData from '../../assets/pincodes.json';
import Navbar from './layout/Navbar';

const ProductDetail = () => {
  const route = useRoute();
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const product = route.params?.product;

  const checkDelivery = () => {
    setLoading(true);
    
    // Check if product is in stock
    const stockInfo = stockData.find(item => item['Product ID'] === product['Product ID']);
    if (!stockInfo?.['Stock Available']) {
      setDeliveryInfo({
        available: false,
        message: 'Product is currently out of stock'
      });
      setLoading(false);
      return;
    }

    // Find pincode information
    const pincodeInfo = pincodeData.find(item => item.Pincode === parseInt(pincode));
    if (!pincodeInfo) {
      setDeliveryInfo({
        available: false,
        message: 'Delivery not available at this location'
      });
      setLoading(false);
      return;
    }

    // Calculate delivery date based on provider
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let deliveryDate = new Date();
    let message = '';

    switch (pincodeInfo['Logistics Provider']) {
      case 'Provider A':
        if (currentHour < 17) { // Before 5 PM
          message = 'Same day delivery available';
        } else {
          deliveryDate.setDate(deliveryDate.getDate() + 1);
          message = `Get it By Tomorrow, ${deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
        break;

      case 'Provider B':
        if (currentHour < 9) { // Before 9 AM
          message = 'Same day delivery available';
        } else {
          deliveryDate.setDate(deliveryDate.getDate() + 1);
          message = `Get it By Tomorrow, ${deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
        break;

      case 'General Partners':
        deliveryDate.setDate(deliveryDate.getDate() + pincodeInfo.TAT);
        message = `Get it By ${deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        break;
    }

    setDeliveryInfo({
      available: true,
      message,
      provider: pincodeInfo['Logistics Provider'],
      tat: pincodeInfo.TAT
    });
    
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <ScrollView style={styles.container}>
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbText}>Home / {product?.Category}</Text>
      </View>
      
      <Text style={styles.productTitle}>{product?.['Product Name']}</Text>
      
      <View style={styles.benefitsContainer}>
        {product?.benefits?.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <Image
        source={require('../../assets/p5.png')}
        style={styles.productImage}
        resizeMode="contain"
      />

      <View style={styles.priceContainer}>
        <Text style={styles.mrpLabel}>MRP: </Text>
        <Text style={styles.price}>₹{product?.Price}</Text>
        <Text style={styles.taxInfo}>(incl. of all taxes)</Text>
      </View>

      <View style={styles.sizeContainer}>
        <Text style={styles.sizeLabel}>Size: </Text>
        <TouchableOpacity style={styles.sizeButton}>
          <Text style={styles.sizeButtonText}>30 ml</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryContainer}>
        <View style={styles.pincodeInputContainer}>
          <TextInput
            style={styles.pincodeInput}
            placeholder="Enter Pincode"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity 
            style={styles.checkButton}
            onPress={checkDelivery}
            disabled={pincode.length !== 6}
          >
            <Text style={styles.checkButtonText}>Check</Text>
          </TouchableOpacity>
        </View>

        {deliveryInfo && (
          <View style={styles.deliveryInfo}>
            <Text style={[
              styles.deliveryMessage,
              !deliveryInfo.available && styles.errorMessage
            ]}>
              {deliveryInfo.message}
            </Text>
          </View>
        )}

        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>Available offers</Text>
          <View style={styles.offerItem}>
            <Image
              source={require('../../assets/p1.png')}
              style={styles.offerIcon}
            />
            <View style={styles.offerDetails}>
              <Text style={styles.offerText}>Paylater at checkout</Text>
              <Text style={styles.offerSubtext}>Instant EMI | No credit card</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy it now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  breadcrumb: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#666',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '600',
    padding: 16,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkmarkText: {
    color: '#4caf50',
    fontSize: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  mrpLabel: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  taxInfo: {
    fontSize: 12,
    color: '#666',
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sizeLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#9747FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizeButtonText: {
    color: '#9747FF',
  },
  deliveryContainer: {
    padding: 16,
  },
  pincodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pincodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  checkButton: {
    backgroundColor: '#9747FF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  deliveryInfo: {
    marginTop: 8,
  },
  deliveryMessage: {
    fontSize: 14,
    color: '#4caf50',
  },
  errorMessage: {
    color: '#f44336',
  },
  offersContainer: {
    marginTop: 16,
    backgroundColor: '#fff9c4',
    padding: 16,
    borderRadius: 8,
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  offerDetails: {
    flex: 1,
  },
  offerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  offerSubtext: {
    fontSize: 12,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9747FF',
    borderRadius: 25,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#9747FF',
    fontSize: 16,
    fontWeight: '500',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#9747FF',
    borderRadius: 25,
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductDetail;