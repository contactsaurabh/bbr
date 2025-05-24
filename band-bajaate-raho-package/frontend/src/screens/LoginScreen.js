import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ENV from '../config/env';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleTwitterLogin = async () => {
    setLoading(true);
    try {
      // Open Twitter OAuth URL
      const authUrl = `${ENV.API_URL}/auth/twitter`;
      await Linking.openURL(authUrl);
    } catch (error) {
      console.error('Failed to open Twitter auth URL', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo-placeholder.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Band Bajaate Raho</Text>
        <Text style={styles.subtitle}>Amplify Consumer Voices</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.featureItem}>
          <Ionicons name="share-social-outline" size={24} color="#1DA1F2" />
          <Text style={styles.featureText}>Share your X posts</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="repeat-outline" size={24} color="#1DA1F2" />
          <Text style={styles.featureText}>Get reposts from the community</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="cash-outline" size={24} color="#1DA1F2" />
          <Text style={styles.featureText}>Earn points redeemable for real money</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleTwitterLogin}
        disabled={loading}
      >
        <Ionicons name="logo-twitter" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>
          {loading ? 'Connecting...' : 'Sign in with X (Twitter)'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By signing in, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1DA1F2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#657786',
  },
  infoContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#14171A',
  },
  loginButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#657786',
    fontSize: 12,
  },
});

export default LoginScreen;
