import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Cart = ({ deliveryInfo, onCheckDelivery }) => {
  // const [showPincodeModal, setShowPincodeModal] = useState(false);

  return (
    <>
      <View style={styles.buttonsContainer}>
        <View style={styles.up}>
          <View style={styles.uprev}>
            <Text style={styles.text2}>
              <Text style={styles.star}>★</Text> 4.8 (30 Reviews)
            </Text>
          </View>
          <TouchableOpacity style={styles.upnxt} onPress={onCheckDelivery}>
            <Image
              source={require("../../assets/download.png")}
              style={styles.ico}
            />
            <Text style={styles.icoText}>
              {deliveryInfo
                ? deliveryInfo.available
                  ? `Get it by ${deliveryInfo.message}`
                  : deliveryInfo.message
                : "Check delivery date"}
            </Text>
            <Icon name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.down}>
          <TouchableOpacity style={styles.cartButton}>
            <View style={styles.buttonContent}>
              <Icon name="add-shopping-cart" size={20} color="#9747FF" />
              <Text style={styles.cartButtonText}>Add to cart</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <View style={styles.buttonContent}>
              <Image
                source={require("../../assets/bolt.png")}
                style={styles.boltIcon}
              />
              <Text style={styles.buyButtonText}>Buy it now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Cart;
const styles = StyleSheet.create({
  boltIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: 'white', // This will make the icon white to match the text
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // Update these styles to accommodate icons
  cartButton: {
    width: "43%",
    height: 50,
    borderWidth: 1,
    borderColor: "#9747FF",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buyButton: {
    width: "43%",
    height: 50,
    backgroundColor: "#9747FF",
    borderRadius: 10,
    padding: 12,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    // padding: 16,

    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 120,
    justifyContent: "space-between",
    width: "100%",
    // position: "relative",
    // position:'fixed'
  },
  up: {
    // backgroundColor:"black"
    display: "flex",
    textAlign: "center",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // backgroundColor:"yellow",
    backgroundColor: "#f7f7f7",
    flexDirection: "row",
  },
  uprev: {
    textAlign: "center",
    textAlignVertical: "center",
    borderRightWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    height: "100%",
    paddingRight: 20,
  },
  upnxt: {
    textAlign: "center",
    paddingLeft: 20,
    textAlignVertical: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    // borderRightWidth:1,
    borderColor: "#ddd",
    height: "100%",
  },
  down: {
    height: "60%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  cartButton: {
    // flex: 1,
    borderWidth: 1,
    borderColor: "#9747FF",
    width: "43%",
    height: 50,
    borderRadius: 10,
    padding: 10,
    // marginRight: 8,
    alignItems: "center",
  },
  ico: {
    width: 20,
    height: 20,
  },
  cartButtonText: {
    color: "#9747FF",
    fontSize: 16,
    fontWeight: "500",
  },
  buyButton: {
    width: "43%",
    height: 50,
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
});
