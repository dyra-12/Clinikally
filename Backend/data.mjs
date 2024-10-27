import fs from 'fs';
import Papa from 'papaparse';
import moment from 'moment';
// 1. Function to parse CSV file from file path
const parseCSVFromFile = (filePath) => {
  const csvString = fs.readFileSync(filePath, 'utf-8');
  return Papa.parse(csvString, { header: true }).data;
};

const productsFilePath = './Products.csv';
const stockFilePath = './Stock.csv';
const pincodesFilePath = './Pincodes.csv';

const products = parseCSVFromFile(productsFilePath);
const stock = parseCSVFromFile(stockFilePath);
const pincodes = parseCSVFromFile(pincodesFilePath);

// Test Above function
// console.log("Products:", products); 
// console.log("Stock:", stock);      
// console.log("Pincodes:", pincodes);

//  2. Function to filter products by stock availability
const getAvailableProducts = (products, stock) => {
  return products.filter(product => {
    const stockInfo = stock.find(s => s['Product ID'] === product['Product ID']);
    return stockInfo && stockInfo['Stock Available'] === 'True';
  });
};

// Test for above fun
// const availableProducts = getAvailableProducts(products, stock);
// console.log("Available Products:", availableProducts); 

// 3. Function to check if a product is in stock
const isProductInStock = (productId, stockData) => {
  const stockInfo = stockData.find(stock => stock['Product ID'] === productId);
  return stockInfo ? stockInfo['Stock Available'] === 'True' : false;
};
// Test for the above code :
// console.log("Is Product ID 1 in stock?", isProductInStock("2", stock));

// 4. percentage of products in stock
function calculateStockAvailability(stockData) {
  const totalProducts = stockData.length;
  const inStockCount = stockData.filter(product => product['Stock Available'] === 'True').length;
  
  console.log(`Total Products: ${totalProducts}`);
  console.log(`In Stock Count: ${inStockCount}`);

  const inStockPercentage = (inStockCount / totalProducts) * 100;
  return inStockPercentage.toFixed(2); 
}

// Test for the above code:
// const stockAvailabilityPercentage = calculateStockAvailability(stock);
// console.log(`Product Stock Availability: ${stockAvailabilityPercentage}%`);


// 5. Function to validate pincode
const isValidPincode = (pincode, pincodes) => {
  return pincodes.some(p => p.Pincode === pincode);
};

// Test : 
// console.log("Is valid pincode (100000):", isValidPincode("100000", pincodes)); // true
// console.log("Is valid pincode (125001):", isValidPincode("125001", pincodes)); // false

// 6. Delivery Date Estimation
const estimateDeliveryDate = (productId, pincode, stockData, pincodeData) => {
  const currentTime = moment(); 
  const productInStock = isProductInStock(productId, stockData);
  
  if (!productInStock) {
    return "Product is out of stock.";
  }

  const pincodeInfo = pincodeData.find(pin => pin.Pincode === pincode);
  
  if (!pincodeInfo) {
    return "Invalid pincode.";
  }
  
  const provider = pincodeInfo['Logistics Provider'];
  const tat = parseInt(pincodeInfo['TAT']);
  
  let deliveryDate;
  
  if (provider === 'Provider A') {
    // Provider A: Same-day delivery if ordered before 5 PM
    if (currentTime.hour() < 17) {
      deliveryDate = moment().format('dddd, MMMM Do YYYY'); // Same day
      return `Delivery Date: ${deliveryDate} (Same-day delivery)`;
    } else {
      // Calculate TAT for Provider A
      deliveryDate = moment().add(tat, 'days').format('dddd, MMMM Do YYYY');
      return `Delivery Date: ${deliveryDate} (Estimated TAT: ${tat} days)`;
    }

  } else if (provider === 'Provider B') {
    // Provider B: Same-day delivery if ordered before 9 AM
    if (currentTime.hour() < 9) {
      deliveryDate = moment().format('dddd, MMMM Do YYYY'); // Same day
      return `Delivery Date: ${deliveryDate} (Same-day delivery)`;
    } else {
      // Next day delivery
      deliveryDate = moment().add(1, 'days').format('dddd, MMMM Do YYYY');
      return `Delivery Date: ${deliveryDate} (Next-day delivery)`;
    }

  } else {
    // General Partners: Calculate TAT (2 to 5 days)
    deliveryDate = moment().add(tat, 'days').format('dddd, MMMM Do YYYY');
    return `Delivery Date: ${deliveryDate} (Estimated TAT: ${tat} days)`;
  }
};
// Test for above code:
// console.log(estimateDeliveryDate("1", "100001", stock, pincodes)); // Expected output will depend on current time

// 7. Countdown Timer for Same-Day Delivery
function startCountdown(cutoffHour) {
  // const countdownElement = document.getElementById("countdown");

  const interval = setInterval(() => {
    const currentTime = new Date();
    
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffHour, 0, 0, 0);

    const timeDifference = cutoffTime - currentTime;

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // countdownElement.innerHTML = `Time remaining for same-day delivery: ${hours}h ${minutes}m ${seconds}s`;
      
      console.log(`Time remaining: ${hours}h ${minutes}m ${seconds}s`);
    } else {
      // countdownElement.innerHTML = "Cutoff time for same-day delivery has passed.";
      console.log("Cutoff time for same-day delivery has passed.");
      clearInterval(interval);
    }
  }, 1000);
}

// Example usage: Start countdown for 5 PM (cutoff hour = 17)
// startCountdown(17); // Adjust to 9 if using Provider B's cutoff time