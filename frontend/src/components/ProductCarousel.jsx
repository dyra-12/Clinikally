import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const productImages = [
    require("../../assets/p5.png"),
    require("../../assets/pd1.jpg"),
    require("../../assets/pd2.jpg"),
    require("../../assets/pd3.jpg"),
    require("../../assets/pd4.png")
    
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex === productImages.length - 1) {
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
    const newIndex = activeIndex === 0 ? productImages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    slideRef.current.scrollTo({ x: width * newIndex, animated: true });
  };

  const handleNext = () => {
    const newIndex = activeIndex === productImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    slideRef.current.scrollTo({ x: width * newIndex, animated: true });
  };

  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setActiveIndex(index);
  };

  const handleImagePress = (index) => {
    console.log('Image pressed:', index);
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
      >
        {productImages.map((image, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.imageContainer}
            onPress={() => handleImagePress(index)}
          >
            <Image
              source={image}
              style={styles.productImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={handlePrevious}
        >
          <MaterialIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.pagination}>
          {productImages.map((_, index) => (
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
    width: '100%',
    height: 320,
    backgroundColor: '#f4f5f7',
    justifyContent: 'center',
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
  scrollView: {
    width: width,
  },
  imageContainer: {
    width: width, // Changed to full width
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: width * 0.9, // Keep image slightly smaller than screen width
    height: '90%',
    borderRadius: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  navButton: {
    borderRadius: 100,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  prevButton: {
    width: 40,
    height: 40,
  },
  nextButton: {
    width: 40,
    height: 40,
  },
  pagination: {
    flexDirection: 'row',
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
    right: 30,
    bottom: 260,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
    borderWidth:0.6,
    borderColor:"#CACCCE"
  },
});

export default ProductCarousel;