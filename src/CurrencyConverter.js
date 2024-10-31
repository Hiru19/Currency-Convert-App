import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { fetchExchangeRate } from '../src/CurrencyService';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('An error occurred while converting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount to Convert:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={baseCurrency}
        onValueChange={(itemValue) => setBaseCurrency(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="GBP" value="GBP" />
    
      </Picker>

      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={targetCurrency}
        onValueChange={(itemValue) => setTargetCurrency(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="GBP" value="GBP" />
        
      </Picker>

      <Button title={loading ? "Converting..." : "Convert"} onPress={handleConvert} disabled={loading} />

      {convertedAmount !== null && (
        <Text style={styles.result}>
          {amount} {baseCurrency} is {convertedAmount} {targetCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    marginVertical: 10,
    fontSize: 18,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CurrencyConverter;
