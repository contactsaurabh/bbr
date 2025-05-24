import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ENV from '../config/env';
import PostItem from '../components/PostItem';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'following'

  useEffect(() => {
    fetchPosts();
  }, [viewMode]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const endpoint = viewMode === 'following' ? '/posts/following' : '/posts';
      
      const response = await axios.get(`${ENV.API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleRepost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(`${ENV.API_URL}/posts/${postId}/repost`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update post in the list
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, repostCount: post.repostCount + 1 } 
          : post
      ));
      
    } catch (error) {
      console.error('Failed to repost', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Band Bajaate Raho</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'all' && styles.activeTab]}
          onPress={() => setViewMode('all')}
        >
          <Text style={[styles.tabText, viewMode === 'all' && styles.activeTabText]}>All Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'following' && styles.activeTab]}
          onPress={() => setViewMode('following')}
        >
          <Text style={[styles.tabText, viewMode === 'following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color="#AAB8C2" />
      <Text style={styles.emptyText}>No posts yet</Text>
      <Text style={styles.emptySubtext}>
        {viewMode === 'all' 
          ? 'Be the first to share a post!' 
          : 'Follow users to see their posts here'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem 
            post={item} 
            onRepost={() => handleRepost(item._id)}
          />
        )}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#1DA1F2']}
          />
        }
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={posts.length === 0 && styles.emptyListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DA1F2',
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#E8F5FD',
  },
  tabText: {
    color: '#657786',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1DA1F2',
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14171A',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#657786',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;
