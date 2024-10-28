import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductCarousel = ({ images = [], onImagePress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  // If no images provided, use a default product image
  const defaultImage = require("../../assets/p5.png");
  const displayImages = images.length > 0 ? images : Array(8).fill(defaultImage);

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex === displayImages.length - 1) {
        setActiveIndex(0);
        slideRef.current.scrollTo({ x: 0, animated: true });
      } else {
        setActiveIndex(activeIndex + 1);
        slideRef.current.scrollTo({ x: width * (activeIndex + 1), animated: true });
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? displayImages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    slideRef.current.scrollTo({ x: width * newIndex, animated: true });
  };

  const handleNext = () => {
    const newIndex = activeIndex === displayImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    slideRef.current.scrollTo({ x: width * newIndex, animated: true });
  };

  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/doctorIcon.png")}
        style={styles.cornerImage}
      />
      
      <Animated.ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {displayImages.map((image, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => onImagePress?.(index)}
            style={styles.imageContainer}
          >
            <Image
              source={image}
              style={styles.productImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      <View style={styles.cara}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={handlePrevious}
        >
          <MaterialIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.pagination}>
          {displayImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <MaterialIcons name="chevron-right" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.magnifyButton}>
        <MaterialIcons name="search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width,
    height: 320, // Fixed height instead of relative
    backgroundColor: '#f4f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: width,
    height: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  cornerImage: {
    height: 55,
    width: 55,
    position: 'absolute',
    zIndex: 10,
    left: 30,
    top: 20,
  },
  imageContainer: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add some padding to prevent image from touching edges
  },
  productImage: {
    width: '100%',
    height: '85%', // Reduced slightly to prevent cropping
    borderRadius: 20,
  },
  cara: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    borderRadius: 100,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 40,
    height: 40,
  },
  prevButton: {},
  nextButton: {},
  pagination: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  magnifyButton: {
    position: 'absolute',
    right: 16,
    bottom: 70,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
});

export default ProductCarousel;