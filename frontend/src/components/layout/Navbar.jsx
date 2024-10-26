// src/components/layout/Navbar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const menuItems = [
    { title: 'Home', screen: 'Home' },
    { title: 'Profile', screen: 'Profile' },
    { title: 'Settings', screen: 'Settings' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Your Logo</Text>
        
        {/* Hamburger menu for mobile */}
        {windowWidth < 768 && (
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Ionicons name={isMenuOpen ? "close" : "menu"} size={24} color="black" />
          </TouchableOpacity>
        )}

        {/* Desktop menu */}
        {windowWidth >= 768 && (
          <View style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Mobile menu dropdown */}
      {windowWidth < 768 && isMenuOpen && (
        <View style={styles.mobileMenu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mobileMenuItem}
              onPress={() => {
                navigation.navigate(item.screen);
                setIsMenuOpen(false);
              }}
            >
              <Text style={styles.mobileMenuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    height: 60,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
  menuItems: {
    flexDirection: 'row',
  },
  menuItem: {
    marginLeft: 20,
  },
  menuItemText: {
    fontSize: 16,
  },
  mobileMenu: {
    backgroundColor: '#fff',
    padding: 10,
  },
  mobileMenuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mobileMenuItemText: {
    fontSize: 16,
  },
});

export default Navbar;