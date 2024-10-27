import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ provider, style }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTime = () => {

     
      const currentTime = new Date();
       currentTime.setHours(8, 0, 0, 0);
      const cutoffTime = new Date();
      

      // Set cutoffHour based on the provider
      const cutoffHour = provider === 'Provider A' ? 17 : 9; // 5 PM for Provider A, 9 AM for Provider B
      cutoffTime.setHours(cutoffHour, 0, 0, 0);

      const timeDifference = cutoffTime - currentTime;

      // Check if cutoff time is in the future for today
      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        setIsExpired(false);
      } else {
        setTimeRemaining('');
        setIsExpired(true);
      }
    };

    calculateTime(); // Initial calculation
    const interval = setInterval(calculateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [provider]);

  return (
    <View style={[styles.container, style]}>
      {!isExpired && provider !== "General Partners" && (
        <View style={styles.timerContainer}>
          <View style={styles.headerContainer}>
            {/* <Image
              source={require('../../assets/clock.png')}
              style={styles.clockIcon}
            /> */}
            <Text style={styles.timerText}>Order within</Text>
          </View>
          
          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{timeRemaining}</Text>
            </View>
          </View>
          
          <Text style={styles.deliveryText}>
            for <Text style={styles.highlightText}>Same Day Delivery</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: 15,
      marginHorizontal: 10,
      borderRadius: 12,
      backgroundColor: '#FFF0F5', // Light pink background
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: '#E2226E', // Main pink color for border
      borderStyle:"dashed"
    },
    timerContainer: {
      padding: 15,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    clockIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
      tintColor: '#E2226E', // Main pink color for icon
    },
    timerText: {
      fontSize: 16,
      color: '#424242',
      fontWeight: '500',
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8,
    },
    timeBlock: {
      backgroundColor: '#E2226E', // Main pink color for time block
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      minWidth: 120,
      alignItems: 'center',
      shadowColor: '#E2226E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    timeValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      letterSpacing: 1,
    },
    deliveryText: {
      fontSize: 14,
      color: '#616161',
      marginTop: 8,
    },
    highlightText: {
      color: '#E2226E', // Main pink color for highlighted text
      fontWeight: '600',
    },
  });

export default CountdownTimer;
