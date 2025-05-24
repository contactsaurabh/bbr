import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ENV from '../config/env';

const RedeemScreen = ({ navigation }) => {
  const [points, setPoints] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paymentEmail, setPaymentEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRedeem = async () => {
    if (!points || isNaN(parseInt(points)) || parseInt(points) < 500) {
      Alert.alert('Error', 'Please enter at least 500 points to redeem');
      return;
    }

    if (!paymentEmail) {
      Alert.alert('Error', 'Please enter your payment email');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `${ENV.API_URL}/transactions/redeem`,
        {
          points: parseInt(points),
          paymentMethod,
          paymentDetails: { email: paymentEmail }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Alert.alert(
        'Success',
        `Your redemption request for $${(parseInt(points) / 100).toFixed(2)} has been submitted!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Failed to redeem points', error);
      const errorMsg = error.response?.data?.message || 'Failed to redeem points. Please try again.';
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Redeem Points</Text>

        <Text style={styles.description}>
          Convert your points to real money! Each 100 points equals $1.
          Minimum redemption is 500 points ($5).
        </Text>

        <View style={styles.formSection}>
          <Text style={styles.label}>Points to Redeem</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter points (minimum 500)"
              value={points}
              onChangeText={setPoints}
              keyboardType="number-pad"
            />
          </View>
          <Text style={styles.conversionText}>
            {points && !isNaN(parseInt(points))
              ? `= $${(parseInt(points) / 100).toFixed(2)}`
              : '= $0.00'}
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'paypal' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('paypal')}
            >
              <Text
                style={[
                  styles.paymentOptionText,
                  paymentMethod === 'paypal' && styles.selectedPaymentOptionText
                ]}
              >
                PayPal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'bank' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('bank')}
            >
              <Text
                style={[
                  styles.paymentOptionText,
                  paymentMethod === 'bank' && styles.selectedPaymentOptionText
                ]}
              >
                Bank Transfer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Payment Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your payment email"
              value={paymentEmail}
              onChangeText={setPaymentEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.redeemButton,
            (!points || parseInt(points) < 500 || !paymentEmail) && styles.disabledButton
          ]}
          onPress={handleRedeem}
          disabled={loading || !points || parseInt(points) < 500 || !paymentEmail}
        >
          <Text style={styles.redeemButtonText}>
            {loading ? 'Processing...' : 'Redeem Now'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="information-circle-outline" size={20} color="#657786" />
            <Text style={styles.infoText}>
              Redemption requests are processed within 3-5 business days
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#657786" />
            <Text style={styles.infoText}>
              Your payment information is secure and encrypted
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14171A',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#657786',
    marginBottom: 24,
    lineHeight: 22,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#14171A',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  conversionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  paymentOptions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  paymentOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    marginRight: 8,
    borderRadius: 8,
  },
  selectedPaymentOption: {
    borderColor: '#1DA1F2',
    backgroundColor: '#E8F5FD',
  },
  paymentOptionText: {
    color: '#657786',
    fontWeight: '500',
  },
  selectedPaymentOptionText: {
    color: '#1DA1F2',
  },
  redeemButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#AAB8C2',
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#F5F8FA',
    borderRadius: 8,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#657786',
    marginLeft: 8,
    flex: 1,
  },
});

export default RedeemScreen;
