import axios from 'axios';


const API_KEY = 'e6ea9b9dd1014ab0edbfab36'; //my API key//

const BASE_URL = 'https://v6.exchangerate-api.com/v6'; //end point//


export const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
  try {
    
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`//api request//
    );

    
    if (response.data && response.data.conversion_rates && response.data.conversion_rates[targetCurrency]) {
      const rate = response.data.conversion_rates[targetCurrency];
      return rate;
    } else {
      console.error('Invalid response structure:', response.data);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error; 
  }
};
