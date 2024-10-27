import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import stockData from "../../assets/stock.json";
import pincodeData from "../../assets/pincodes.json";
import Navbar from "./layout/Navbar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetail = () => {
  const route = useRoute();
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPack, setSelectedPack] = useState("30 gm");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product] = useState({
    ...route.params?.product,
    "Original Price": 1099,
    "Sale Price": 989,
    benefits: ["Reduce Fineline", "Hydrates", "Lightens Skin"],
  });

  const carouselImages = Array(8).fill(null); // For 8 carousel indicators

  const checkDelivery = () => {
    setLoading(true);

    // Check if product is in stock
    const stockInfo = stockData.find(
      (item) => item["Product ID"] === product["Product ID"]
    );
    if (!stockInfo?.["Stock Available"]) {
      setDeliveryInfo({
        available: false,
        message: "Product is currently out of stock",
      });
      setLoading(false);
      return;
    }

    // Find pincode information
    const pincodeInfo = pincodeData.find((item) => item.Pincode === pincode);
    if (!pincodeInfo) {
      setDeliveryInfo({
        available: false,
        message: "Delivery not available at this location",
      });
      setLoading(false);
      return;
    }

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let deliveryDate = new Date();
    let message = "";

    // Delivery logic based on provider
    switch (pincodeInfo["Logistics Provider"]) {
      case "Provider A":
        if (currentHour < 17) {
          // Before 5 PM
          deliveryDate = new Date();
          message = "Same-day delivery available if ordered before 5 PM";
        } else {
          deliveryDate.setDate(deliveryDate.getDate() + 1);
          message = `Next-day delivery by ${deliveryDate.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              month: "short",
              day: "numeric",
            }
          )}`;
        }
        break;

      case "Provider B":
        if (currentHour < 9) {
          // Before 9 AM
          deliveryDate = new Date();
          message = "Same-day delivery available if ordered now";
        } else {
          deliveryDate.setDate(deliveryDate.getDate() + 1);
          message = `Next-day delivery by ${deliveryDate.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              month: "short",
              day: "numeric",
            }
          )}`;
        }
        break;

      case "General Partners":
        // Using TAT from pincode data for delivery estimate
        const tat = parseInt(pincodeInfo.TAT);
        deliveryDate.setDate(deliveryDate.getDate() + tat);
        message = `Estimated delivery by ${deliveryDate.toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            month: "short",
            day: "numeric",
          }
        )} (${tat} days)`;
        break;

      default:
        message = "Delivery information not available";
        break;
    }

    setDeliveryInfo({
      available: true,
      message,
      provider: pincodeInfo["Logistics Provider"],
      tat: pincodeInfo.TAT,
      deliveryDate,
    });

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      <ScrollView style={styles.container}>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Home / Skin Cream</Text>
        </View>

        <Text style={styles.productTitle}>{product?.["Product Name"]}</Text>

        <View style={styles.benefitsContainer}>
          {product.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.checkmarkBadge}>
                <Icon
                  name="check-circle"
                  size={20}
                  color="green"
                  style={styles.checkmarkIcon}
                />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/doctorIcon.png")} 
            style={styles.cornerImage} 
          />
          <Image
            source={require("../../assets/p5.png")}
            style={styles.productImage}
            
          />
          <TouchableOpacity style={styles.magnifyButton}>
            <Text style={styles.magnifyIcon}>
              <Icon
                name="search"
                size={20}
                color="black"
                style={styles.searchIcon}
              />
            </Text>
          </TouchableOpacity>

          <View style={styles.carouselIndicators}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Image
              source={require("../../assets/p1.png")}
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>101% Original</Text>
          </View>
          <View style={styles.featureItem}>
            <Image
              source={require("../../assets/p1.png")}
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Lowest Price</Text>
          </View>
          <View style={styles.featureItem1}>
            <Image
              source={require("../../assets/p1.png")}
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Free Shipping</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>
              ₹{product["Original Price"]}
            </Text>
            <Text style={styles.salePrice}>₹{product["Sale Price"]}</Text>
            <View style={styles.saveTag}>
              <Text style={styles.saveTagText}>SAVE 10%</Text>
            </View>
          </View>
          <Text style={styles.taxInfo}>(incl. of all taxes)</Text>
        </View>

        <View style={styles.packContainer}>
          <Text style={styles.packLabel}>Pack:</Text>
          <View style={styles.packOptions}>
            <TouchableOpacity
              style={[
                styles.packButton,
                selectedPack === "30 gm" && styles.selectedPack,
              ]}
              onPress={() => setSelectedPack("30 gm")}
            >
              <Text
                style={[
                  styles.packButtonText,
                  selectedPack === "30 gm" && styles.selectedPackText,
                ]}
              >
                30 gm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.packButton,
                selectedPack === "2 x 30 gm" && styles.selectedPack,
              ]}
              onPress={() => setSelectedPack("2 x 30 gm")}
            >
              <Text
                style={[
                  styles.packButtonText,
                  selectedPack === "2 x 30 gm" && styles.selectedPackText,
                ]}
              >
                2 x 30 gm
              </Text>
              <Text style={styles.saveMoreText}>Save More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Qty:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentlyInCart}>
            <Text style={styles.recentlyInCartText}>
              📈 Recently in 1575 carts
            </Text>
          </View>
        </View>

        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>Available offers</Text>
          <View style={styles.offerItem}>
            <View style={styles.offerIconContainer}>
              <Text style={styles.offerIcon}>%</Text>
            </View>
            <View style={styles.offerDetails}>
              <Text style={styles.offerText}>₹10 off on prepaid orders</Text>
              <Text style={styles.offerSubtext}>Auto applied at checkout.</Text>
            </View>
            <Text style={styles.offerCount}>3/5</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.hurryButton}>
          <Text style={styles.hurryButtonText}>Hurry, Few Left!</Text>
        </TouchableOpacity>

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
              style={[
                styles.checkButton,
                pincode.length !== 6 && styles.disabledButton,
              ]}
              onPress={checkDelivery}
              disabled={pincode.length !== 6}
            >
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <Text style={styles.loadingText}>
              Checking delivery information...
            </Text>
          )}

          {deliveryInfo && (
            <View style={styles.deliveryInfo}>
              <Text
                style={[
                  styles.deliveryMessage,
                  !deliveryInfo.available && styles.errorMessage,
                ]}
              >
                {deliveryInfo.message}
              </Text>
              {deliveryInfo.available && (
                <Text style={styles.providerInfo}>
                  Delivery by: {deliveryInfo.provider}
                </Text>
              )}
            </View>
          )}
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
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  breadcrumb: {
    padding: 16,
    
    
  },
  breadcrumbText: {
    fontSize: 14,
    color: "#666",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "600",
    paddingLeft:16,
    color: "#333",
  },
  benefitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 3,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkmarkBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  checkmarkIcon: {
    color: "#008001",
    marginRight: 4,
  },
  benefitText: {
    color: "#008001",
    fontSize: 14,
    flexShrink: 1, // Prevents the text from wrapping to the next line
  },
  searchIcon: {
    color: "black",
  },
  cornerImage:{
    height:55,
    width:55,
    position:'absolute',
    zIndex:10,
    left:30,
    top:20,
  },

  imageContainer: {
    position: "relative",
    justifyContent:"center",
    alignItems:"center",
    
    
  },
  productImage: {
    width: "90%",
    height: 300,
    borderRadius:20,
    

  },
  magnifyButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  carouselIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  activeIndicator: {
    backgroundColor: "#9747FF",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height:70,
    borderWidth: 1,
    borderColor: "#C5A1EF",
    margin: 16,
    borderRadius: 8,
  },
  featureItem: {
    
    alignItems: "center",
    borderRightWidth:1,
    borderColor:"black",
    // paddingRight:17,
    // padding:10,
    flex:1,
    justifyContent:"center",
    borderColor:"#C5A1EF",
  },
  featureItem1:{
    alignItems: "center",
    flex:1,
    justifyContent:'center',

  },
  featureIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: "#666",
  },
  
  priceContainer: {
    padding: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "line-through",
  },
  salePrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008001",
  },
  saveTag: {
    backgroundColor: "#9747FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saveTagText: {
    color: "white",
    fontSize: 12,
  },
  packContainer: {
    padding: 16,
  },
  packLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  packOptions: {
    flexDirection: "row",
    gap: 12,
  },
  packButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  selectedPack: {
    borderColor: "#9747FF",
    backgroundColor: "#f3e5f5",
  },
  packButtonText: {
    color: "#666",
  },
  selectedPackText: {
    color: "#9747FF",
  },
  saveMoreText: {
    fontSize: 10,
    color: "#4caf50",
    marginTop: 2,
  },
  quantityContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 12,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  quantityButton: {
    padding: 8,
    width: 36,
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#666",
  },
  quantityText: {
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  recentlyInCart: {
    marginLeft: "auto",
  },
  recentlyInCartText: {
    fontSize: 12,
    color: "#666",
  },
  offersContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff9c4",
    borderRadius: 8,
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  offerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  offerIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff9800",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  offerIcon: {
    color: "white",
    fontSize: 16,
  },
  offerDetails: {
    flex: 1,
  },
  offerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  offerSubtext: {
    fontSize: 12,
    color: "#666",
  },
  offerCount: {
    fontSize: 12,
    color: "#666",
  },
  hurryButton: {
    backgroundColor: "#ff9800",
    margin: 16,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  deliveryContainer: {
    padding: 16,
  },
  pincodeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  pincodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  checkButton: {
    backgroundColor: "#9747FF",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  checkButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  deliveryInfo: {
    marginTop: 8,
  },
  deliveryMessage: {
    fontSize: 14,
    color: "#4caf50",
  },
  errorMessage: {
    color: "#f44336",
  },
  offersContainer: {
    marginTop: 16,
    backgroundColor: "#fff9c4",
    padding: 16,
    borderRadius: 8,
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  offerItem: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "500",
  },
  offerSubtext: {
    fontSize: 12,
    color: "#666",
  },
  buttonsContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  cartButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#9747FF",
    borderRadius: 25,
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
    borderRadius: 25,
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

export default ProductDetail;
