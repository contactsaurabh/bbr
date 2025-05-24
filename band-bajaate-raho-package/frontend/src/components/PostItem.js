import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostItem = ({ post, onRepost }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: post.user.profilePicture || 'https://via.placeholder.com/40' }} 
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{post.user.username}</Text>
          <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>
      
      <View style={styles.postContent}>
        <Text style={styles.postUrl}>{post.xPostUrl}</Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Ionicons name="repeat-outline" size={16} color="#657786" />
            <Text style={styles.statText}>{post.repostCount}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.repostButton}
          onPress={onRepost}
        >
          <Ionicons name="repeat" size={18} color="white" />
          <Text style={styles.repostButtonText}>Repost</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#14171A',
  },
  date: {
    fontSize: 14,
    color: '#657786',
  },
  postContent: {
    marginBottom: 16,
  },
  postUrl: {
    fontSize: 15,
    color: '#1DA1F2',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: '#657786',
    marginLeft: 4,
  },
  repostButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  repostButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default PostItem;
