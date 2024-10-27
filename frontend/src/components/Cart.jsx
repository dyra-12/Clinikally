import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from "react-native";
const Cart = () => {
  return (
    <View style={styles.buttonsContainer}>
         <View style={styles.up}></View>
         <View style={styles.down}>

         <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy it now</Text>
          </TouchableOpacity>
         </View>
          
    </View>
  )
}

export default Cart;
const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: "row",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        // position:'fixed'
      },
      cartButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#9747FF",
        borderRadius: 10,
        padding: 12,
        marginRight: 8,
        alignItems: "center",
      },
      cartButtonText: {
        color: "#9747FF",
        fontSize: 16,
        fontWeight: "500",
      },
      buyButton: {
        flex: 1,
        backgroundColor: "#9747FF",
        borderRadius: 10,
        padding: 12,
        marginLeft: 8,
        alignItems: "center",
      },
      buyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
      },
      hurryButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
      },
})