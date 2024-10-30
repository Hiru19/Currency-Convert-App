import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  Button, 
  Picker, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  Animated, 
  Switch,
  TouchableOpacity 
} from 'react-native';
import { fetchExchangeRate } from './src/CurrencyService'; // Ensure this path is correct

const App = () => {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleConvert = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount greater than zero.');
      return;
    }

    setLoading(true);
    try {
      const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
      
      if (rate !== null && rate !== undefined) {
        const convertedAmount = (numericAmount * rate).toFixed(2);
        setConversionResult(convertedAmount);
      } else {
        Alert.alert('Error', 'Failed to fetch exchange rate. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while converting. Please check your network connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(previousState => !previousState);
    Animated.timing(fadeAnim, {
      toValue: isDarkMode ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 20, 
      backgroundColor: isDarkMode ? '#121212' : '#f2f2f2' 
    },
    title: { 
      fontSize: 22, 
      marginBottom: 20, 
      textAlign: 'center', 
      color: isDarkMode ? '#FFFFFF' : '#333' 
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
      marginTop: 10,
      borderRadius: 8,
      overflow: 'hidden'
    },
    resultContainer: {
      marginTop: 30,
      padding: 20,
      backgroundColor: isDarkMode ? '#333333' : '#E0F7FA',
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: isDarkMode ? '#000' : '#333',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#B2EBF2',
    },
    resultText: { 
      fontSize: 22, 
      color: isDarkMode ? '#81C784' : '#00796B',
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
          </Picker>

          <Picker
            selectedValue={targetCurrency}
            onValueChange={(value) => setTargetCurrency(value)}
            style={styles.picker}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Button title="Convert" onPress={handleConvert} color="#007BFF" />
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />}

        {conversionResult !== null && (
          <Animated.View style={{ opacity: fadeAnim }}>
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
