import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import products from '../../assets/products.json';
import { useRoute } from '@react-navigation/native';
// import ProductList from './src/components/ProductList';
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const navigation = useNavigation();

  useEffect(() => {
    loadMoreProducts();
    setLoading(false);
  }, []);

  const loadMoreProducts = () => {
    if (!hasMore || loading) return;

    setLoading(true);
    
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProducts = products.slice(startIndex, endIndex).map((product, index) => ({
      ...product,
      uniqueId: `${startIndex + index}-${product['Product ID']}`
    }));


    if (endIndex >= products.length) {
      setHasMore(false);
    }

    // Simulate network delay for demonstration
    setTimeout(() => {
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 1000); // Add a slight delay to make the loading more visible
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>
          Showing {displayedProducts.length} of {products.length} items
        </Text>
      </View>
      <View style={styles.img}>
        <Image
          source={require('../../assets/p1.png')}
          defaultSource={require('../../assets/p1.png')}
          style={styles.img2}
        />
      </View>
    </View>
  );

  const handleEndReached = () => {
    loadMoreProducts();
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/p5.png')}
          defaultSource={require('../../assets/p5.png')}
          style={styles.productImage}
        />
        <View style={styles.saveTag}>
          <Text style={styles.saveText}>SAVE 15%</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item['Product Name']}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.Price}</Text>
          <Text style={styles.originalPrice}>
            ₹{(parseFloat(item.Price) * 1.2).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading && !hasMore) {
      return (
        <View style={styles.endMessageContainer}>
          <Text style={styles.endMessage}>No more products to load</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#9747FF" />
        </View>
      );
    }

    return null;
  };

  if (loading && displayedProducts.length === 0) {
    return (
      <View style={styles.initialLoaderContainer}>
        <ActivityIndicator size="large" color="#9747FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedProducts}
        renderItem={renderItem}
        keyExtractor={item => item['Product ID'].toString()}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={styles.footerComponentStyle}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  headerContainer: {
    paddingHorizontal: 4,
    paddingTop: 16,
    width: '100%',
    
  },
  headerSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  headerTitle: {
    fontSize: 14,
    color: '#666',
  },
  productsGrid: {
    // padding: 8,
    paddingBottom: 30, // Add padding at the bottom to ensure the footer is visible
  },
  img: {
    height: 100,
    width: '100%',
  },
  img2: {
    height: 100,
    width: '100%',
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    marginTop: 20,
    // shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
    
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  saveTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#9747FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#9747FF',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#9747FF',
    fontSize: 12,
    fontWeight: '500',
  },
  // Updated loader styles
  initialLoaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loaderContainer: {
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  footerComponentStyle: {
    marginVertical: 10,
    marginBottom: 10, // Add extra margin at the bottom
  },
  endMessageContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  endMessage: {
    color: '#666',
    fontSize: 14,
  },
});

export default ProductList;