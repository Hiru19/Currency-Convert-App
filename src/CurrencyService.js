// src/services/CurrencyService.js
import axios from 'axios';

// Replace with your actual API key
const API_KEY = '42d9ce44cf6d4af89754b91524006286E'; 
// Replace with the endpoint from your chosen API provider
const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest'; 

export const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
  try {
    // Ensure the URL is formatted correctly based on the API's documentation
    const response = await axios.get(
      `${BASE_URL}latest?base=${baseCurrency}&symbols=${targetCurrency}&access_key=${API_KEY}`
    );

    // Check if the response contains the expected data structure
    if (response.data && response.data.rates && response.data.rates[targetCurrency]) {
      const rate = response.data.rates[targetCurrency];
      return rate;
    } else {
      console.error('Invalid response structure:', response.data);
      return null; // or throw an error depending on your error handling strategy
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error; // Re-throw the error for further handling in your app
  }
};
