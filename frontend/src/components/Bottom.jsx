import { FontAwesome } from "@expo/vector-icons";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";

const Bottom = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActiveRoute = (routeName) => {
    return route.name === routeName;
  };

  const getIconColor = (routeName) => {
    return isActiveRoute(routeName) ? "#9747FF" : "#666";
  };

  const getTextStyle = (routeName) => ({
    ...styles.navText,
    color: isActiveRoute(routeName) ? "#9747FF" : "#666",
  });
  

  return (
    <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
          
        >
          <MaterialIcons 
            name="home" 
            size={24} 
            color={getIconColor("DoctorConsult")} 
          />
          <Text style={getTextStyle("Home")}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Shop")}
        >
          <Feather 
            name="shopping-bag" 
            size={24} 
            color={getIconColor("Shop")} 
          />
          <Text style={getTextStyle("Shop")}>Products</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Offers")}
        >
          <MaterialIcons 
            name="local-offer" 
            size={24} 
            color={getIconColor("Offers")} 
          />
          <Text style={getTextStyle("Offers")}>Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Quiz")}
        >
          <MaterialIcons 
            name="quiz" 
            size={24} 
            color={getIconColor("Quiz")} 
          />
          <Text style={getTextStyle("Quiz")}>Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Whatsapp")}
        >
          <FontAwesome 
            name="whatsapp" 
            size={24} 
            color={isActiveRoute("Whatsapp") ? "#9747FF" : "#25D366"} 
          />
          <Text style={getTextStyle("Whatsapp")}>Whatsapp</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    flexDirection: "row",
    width:"100%",
    // position:fixed,
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default Bottom;