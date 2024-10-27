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
         <View style={styles.up}>
            <View style={styles.uprev}><Text >★ 4.8 (30 Reviews)</Text></View>    
            
            <View style={styles.upnxt}><Text>Get it By</Text></View>
         </View>
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
        flexDirection: "column",
        // padding: 16,
    
        paddingBottom:0,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        height:120,
        justifyContent:"space-between",
        width:"100%"
        // position: "relative",
        // position:'fixed'
      },
      up:{
        // backgroundColor:"black"
        display: "flex",
        textAlign: "center",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        gap:10,
        // backgroundColor:"yellow",
        backgroundColor:"#f7f7f7",
        flexDirection:"row"

      },
      uprev:{
        textAlign: "center",
        textAlignVertical:"center",
        borderRightWidth:1,
        borderColor:'#ddd',
        justifyContent: "center",
        height: "100%",
        paddingRight:20
      },
      upnxt:{
        textAlign: "center",
        paddingLeft:20,
        textAlignVertical:"center",
        justifyContent: "center",
        // borderRightWidth:1,
        borderColor:'#ddd',
        height: "100%",

      },
      down:{
        height:"60%",
        width:"100%",
        flexDirection:"row",
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        borderTopWidth:1,
        borderColor:'#ddd',

      },
      cartButton: {
        // flex: 1,
        borderWidth: 1,
        borderColor: "#9747FF",
        width:"43%",
        height:50,
        borderRadius: 10,
        padding: 10,
        // marginRight: 8,
        alignItems: "center",
      },
      cartButtonText: {
        color: "#9747FF",
        fontSize: 16,
        fontWeight: "500",
      },
      buyButton: {
        width:"43%",
        height:50,
        // flex: 1,
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