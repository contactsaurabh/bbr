import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ENV from '../config/env';

const SharePostScreen = ({ navigation }) => {
  const [postUrl, setPostUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const validateUrl = (url) => {
    // Basic validation for X (Twitter) URLs
    return url.includes('twitter.com') || url.includes('x.com');
  };

  const handleShare = async () => {
    if (!postUrl.trim()) {
      Alert.alert('Error', 'Please enter a post URL');
      return;
    }

    if (!validateUrl(postUrl)) {
      Alert.alert('Error', 'Please enter a valid X (Twitter) post URL');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(`${ENV.API_URL}/posts`, 
        { xPostUrl: postUrl.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      Alert.alert(
        'Success', 
        'Your post has been shared successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
      
      setPostUrl('');
    } catch (error) {
      console.error('Failed to share post', error);
      const errorMsg = error.response?.data?.message || 'Failed to share post. Please try again.';
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Share Your X Post</Text>
        
        <Text style={styles.description}>
          Share your X posts about consumer issues with the community. 
          For each repost you receive, you'll earn 1 point which can be 
          redeemed for real money.
        </Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="link-outline" size={24} color="#657786" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Paste your X post URL here"
            value={postUrl}
            onChangeText={setPostUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.shareButton, !postUrl.trim() && styles.disabledButton]}
          onPress={handleShare}
          disabled={loading || !postUrl.trim()}
        >
          <Text style={styles.shareButtonText}>
            {loading ? 'Sharing...' : 'Share Post'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="information-circle-outline" size={20} color="#657786" />
            <Text style={styles.infoText}>
              Only X (Twitter) posts are supported
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="repeat-outline" size={20} color="#657786" />
            <Text style={styles.infoText}>
              Earn 1 point for each repost you receive
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={20} color="#657786" />
            <Text style={styles.infoText}>
              Redeem points for real money (100 points = $1)
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#AAB8C2',
  },
  shareButtonText: {
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
  },
});

export default SharePostScreen;
