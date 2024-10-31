import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Picker, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  Animated, 
  Switch 
} from 'react-native';
import { fetchExchangeRate } from './src/CurrencyService'; 

const App = () => {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100)); //Transition I added//

  const handleConvert = async () => {
    const numericAmount = parseFloat(amount);
    console.log(`Parsed Amount: ${numericAmount}`); // Debugging line//

    
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount greater than zero.');
      return;
    }//validation//

    setLoading(true);
    try {
      const rate = await fetchExchangeRate(baseCurrency, targetCurrency);

      if (rate !== null && rate !== undefined) {
        const convertedAmount = (numericAmount * rate).toFixed(2);
        setConversionResult(convertedAmount);

       
        slideAnim.setValue(-100); 
        Animated.timing(slideAnim, {
          toValue: 0, 
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Alert.alert('Error', 'Failed to fetch exchange rate. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while converting. Please check your network connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAmount('');
    setConversionResult(null);
    setLoading(false);
    slideAnim.setValue(-100); //slide animation//
  };

  const toggleTheme = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 20, 
      backgroundColor: isDarkMode ? '#121212' : '#f2f2f2' 
    },
    title: { 
      fontSize: 24,
      marginBottom: 70,
      textAlign: 'center', 
      color: isDarkMode ? '#FFFFFF' : '#333', 
      lineHeight: 24, 
      padding: 10, 
      fontWeight: 'bold',
    },
    input: { 
      borderColor: 'gray', 
      borderWidth: 1, 
      padding: 10, 
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#333' : '#FFFFFF',
      color: isDarkMode ? '#FFFFFF' : '#000',
      fontSize: 16,
      marginBottom: 20,
    },
    pickerContainer: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: 20 
    },
    picker: { 
      height: 40, 
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : '#FFFFFF',
      color: isDarkMode ? '#FFFFFF' : '#000',
      borderRadius: 8,
      marginHorizontal: 5
    },
    buttonContainer: {
      flexDirection: 'column', 
      alignItems: 'center', 
      marginTop: 10,
    },
    buttonWrapper: {
      marginVertical: 10, 
      width: '50%',
    },
    convertButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 20,
      padding: 15, 
      alignItems: 'center',  
      
      
    },
    clearButton: {
      backgroundColor: '#f44336',
      borderRadius: 20,
      padding: 15, 
      alignItems: 'center',
       
    },
    resultContainer: {
      marginTop: 30,
      padding: 20,
      backgroundColor: isDarkMode ? '#424242' : '#FFFFFF',
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: isDarkMode ? '#000' : '#333',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? '#555' : '#B2B2B2',
    },
    resultText: { 
      fontSize: 22, 
      color: isDarkMode ? '#A5D6A7' : '#000000',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    loading: { 
      marginTop: 20 
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>

        <View style={styles.switchContainer}>
          <Text style={{ color: isDarkMode ? '#FFFFFF' : '#333' }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor={isDarkMode ? '#bbb' : '#777'}
        />
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={baseCurrency}
            onValueChange={(value) => setBaseCurrency(value)}
            style={styles.picker}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="AUD" value="AUD" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="CHF" value="CHF" />
            <Picker.Item label="CNY" value="CNY" />
            <Picker.Item label="JPY" value="JPY" />
            <Picker.Item label="INR" value="INR" />
            <Picker.Item label="ZAR" value="ZAR" />
            <Picker.Item label="SGD" value="SGD" />
            <Picker.Item label="LKR" value="LKR" />

          </Picker>
          <Picker
            selectedValue={targetCurrency}
            onValueChange={(value) => setTargetCurrency(value)}
            style={styles.picker}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="AUD" value="AUD" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="CHF" value="CHF" />
            <Picker.Item label="CNY" value="CNY" />
            <Picker.Item label="JPY" value="JPY" />
            <Picker.Item label="INR" value="INR" />
            <Picker.Item label="ZAR" value="ZAR" />
            <Picker.Item label="SGD" value="SGD" />
            <Picker.Item label="LKR" value="LKR" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
              <Text style={{ color: '#FFFFFF', textAlign: 'center',fontSize: 16,fontWeight:'bold' }}>Convert</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={{ color: '#FFFFFF', textAlign: 'center',fontSize: 18,fontWeight:'bold' }}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
        )}

        {conversionResult && (
          <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                {amount} {baseCurrency} = {conversionResult} {targetCurrency}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
