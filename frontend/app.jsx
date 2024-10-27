import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import ProductList from './src/components/ProductList';
import Navbar from './src/components/layout/Navbar';
import Bottom from './src/components/Bottom';
import ProductDetail from './src/components/ProductDetail';
import {
  _View,
} from "react-native";
const DoctorConsultScreen = () => null;  
const OffersScreen = () => null;         
const QuizScreen = () => null;           
const WhatsappScreen = () => null;       
const ProfileScreen = () => null;       
const CartScreen = () => null;           

// Create ShopScreen component that includes the ProductList
const ShopScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      
      <ProductList />
      <Bottom />
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, 
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DoctorConsult" component={DoctorConsultScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="Offers" component={OffersScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Whatsapp" component={WhatsappScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});