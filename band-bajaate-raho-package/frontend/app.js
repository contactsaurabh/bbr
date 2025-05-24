/* Enhanced app.js with improved UI to match popular social media apps */
document.addEventListener('DOMContentLoaded', function() {
  // Sample data
  const sampleData = {
    currentUser: {
      id: 'user123',
      username: 'DemoUser',
      profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
      points: 750,
      postsShared: 8,
      repostsReceived: 42,
      repostsMade: 15,
      following: ['user456', 'user789']
    },
    users: [
      {
        id: 'user456',
        username: 'ConsumerAdvocate',
        profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        points: 1250,
        postsShared: 15,
        repostsReceived: 87
      },
      {
        id: 'user789',
        username: 'TechReviewer',
        profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
        points: 980,
        postsShared: 12,
        repostsReceived: 64
      },
      {
        id: 'user101',
        username: 'ServiceWatchdog',
        profilePicture: 'https://randomuser.me/api/portraits/men/86.jpg',
        points: 1500,
        postsShared: 20,
        repostsReceived: 120
      }
    ],
    posts: [
      {
        id: 'post1',
        user: 'user456',
        username: 'ConsumerAdvocate',
        profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        xPostUrl: 'https://x.com/ConsumerAdvocate/status/1234567890',
        content: 'Just experienced terrible customer service at MegaTelecom. 2 hours on hold and still no resolution to billing error. #ConsumerRights #CustomerService',
        repostCount: 24,
        likeCount: 38,
        commentCount: 12,
        createdAt: '2025-05-20T14:30:00Z',
        reposted: false
      },
      {
        id: 'post2',
        user: 'user789',
        username: 'TechReviewer',
        profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
        xPostUrl: 'https://x.com/TechReviewer/status/9876543210',
        content: 'New smartphone from TechGiant has serious battery issues. Only lasts 4 hours despite 12-hour claim in ads. Anyone else experiencing this? #ConsumerAlert',
        repostCount: 18,
        likeCount: 27,
        commentCount: 8,
        createdAt: '2025-05-21T09:15:00Z',
        reposted: true
      },
      {
        id: 'post3',
        user: 'user101',
        username: 'ServiceWatchdog',
        profilePicture: 'https://randomuser.me/api/portraits/men/86.jpg',
        xPostUrl: 'https://x.com/ServiceWatchdog/status/5678901234',
        content: 'AirFly canceled my flight with no notice and refuses refund. Already filed complaint with aviation authority. RT to spread awareness. #ConsumerRights',
        repostCount: 42,
        likeCount: 65,
        commentCount: 23,
        createdAt: '2025-05-22T16:45:00Z',
        reposted: false
      },
      {
        id: 'post4',
        user: 'user123',
        username: 'DemoUser',
        profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
        xPostUrl: 'https://x.com/DemoUser/status/1357924680',
        content: 'Food delivery app charged me twice and their customer service is unresponsive for 3 days. Anyone else having issues with QuickBite? #ConsumerAlert',
        repostCount: 7,
        likeCount: 19,
        commentCount: 5,
        createdAt: '2025-05-23T08:20:00Z',
        reposted: false
      }
    ],
    leaderboard: [
      {
        id: 'user101',
        username: 'ServiceWatchdog',
        profilePicture: 'https://randomuser.me/api/portraits/men/86.jpg',
        points: 1500
      },
      {
        id: 'user456',
        username: 'ConsumerAdvocate',
        profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        points: 1250
      },
      {
        id: 'user789',
        username: 'TechReviewer',
        profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
        points: 980
      },
      {
        id: 'user123',
        username: 'DemoUser',
        profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
        points: 750
      },
      {
        id: 'user202',
        username: 'FinanceHelper',
        profilePicture: 'https://randomuser.me/api/portraits/women/22.jpg',
        points: 620
      }
    ],
    transactions: [
      {
        id: 'tx1',
        points: 500,
        amount: 5.00,
        status: 'completed',
        paymentMethod: 'paypal',
        createdAt: '2025-05-10T11:30:00Z'
      },
      {
        id: 'tx2',
        points: 1000,
        amount: 10.00,
        status: 'pending',
        paymentMethod: 'bank',
        createdAt: '2025-05-22T14:45:00Z'
      }
    ],
    notifications: [
      {
        id: 'notif1',
        type: 'repost',
        user: 'TechReviewer',
        profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
        content: 'reposted your post',
        time: '2h ago',
        read: false
      },
      {
        id: 'notif2',
        type: 'points',
        content: 'You earned 5 points from reposts',
        time: '1d ago',
        read: true
      },
      {
        id: 'notif3',
        type: 'redemption',
        content: 'Your redemption of $5.00 has been processed',
        time: '3d ago',
        read: true
      }
    ]
  };

  // App state
  let currentView = 'home';
  let currentUser = sampleData.currentUser;
  let posts = sampleData.posts;
  let viewMode = 'all'; // 'all' or 'following'
  let showNotifications = false;
  let darkMode = false;

  // Initialize app
  function initApp() {
    renderHeader();
    renderNavigation();
    renderView();
    
    // Add event listeners for navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const view = this.getAttribute('data-view');
        navigateTo(view);
      });
    });

    // Add event listener for dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Add event listener for notifications toggle
    const notifToggle = document.getElementById('notifications-toggle');
    if (notifToggle) {
      notifToggle.addEventListener('click', toggleNotifications);
    }
  }

  // Toggle dark mode
  function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    renderHeader();
  }

  // Toggle notifications panel
  function toggleNotifications() {
    showNotifications = !showNotifications;
    renderNotifications();
  }

  // Render notifications panel
  function renderNotifications() {
    let notifPanel = document.getElementById('notifications-panel');
    
    if (showNotifications) {
      if (!notifPanel) {
        notifPanel = document.createElement('div');
        notifPanel.id = 'notifications-panel';
        notifPanel.className = 'notifications-panel';
        document.querySelector('.app-wrapper').appendChild(notifPanel);
      }
      
      notifPanel.innerHTML = `
        <div class="notifications-header">
          <h3>Notifications</h3>
          <button class="close-button" id="close-notifications">×</button>
        </div>
        <div class="notifications-list">
          ${sampleData.notifications.map(notif => `
            <div class="notification-item ${notif.read ? '' : 'unread'}">
              ${notif.type === 'repost' ? `
                <img src="${notif.profilePicture}" alt="${notif.user}" class="notif-avatar">
              ` : `
                <div class="notif-icon ${notif.type}">
                  ${notif.type === 'points' ? '💰' : '💸'}
                </div>
              `}
              <div class="notif-content">
                ${notif.type === 'repost' ? `
                  <span class="notif-user">@${notif.user}</span> ${notif.content}
                ` : `
                  ${notif.content}
                `}
                <span class="notif-time">${notif.time}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      // Add event listener for close button
      setTimeout(() => {
        const closeBtn = document.getElementById('close-notifications');
        if (closeBtn) {
          closeBtn.addEventListener('click', toggleNotifications);
        }
      }, 0);
    } else if (notifPanel) {
      notifPanel.remove();
    }
  }

  // Navigation function
  function navigateTo(view) {
    currentView = view;
    renderNavigation();
    renderView();
    window.scrollTo(0, 0);
  }

  // Render header
  function renderHeader() {
    const header = document.querySelector('.app-header');
    if (header) {
      header.innerHTML = `
        <div class="header-left">
          <h1>Band Bajaate Raho</h1>
        </div>
        <div class="header-right">
          <button id="notifications-toggle" class="icon-button">
            <i class="icon">🔔</i>
            <span class="notification-badge">3</span>
          </button>
          <button id="dark-mode-toggle" class="icon-button">
            <i class="icon">${darkMode ? '☀️' : '🌙'}</i>
          </button>
        </div>
      `;

      // Add event listeners
      setTimeout(() => {
        const notifToggle = document.getElementById('notifications-toggle');
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        if (notifToggle) {
          notifToggle.addEventListener('click', toggleNotifications);
        }
        
        if (darkModeToggle) {
          darkModeToggle.addEventListener('click', toggleDarkMode);
        }
      }, 0);
    }
  }

  // Render navigation
  function renderNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const itemView = item.getAttribute('data-view');
      if (itemView === currentView) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Render current view
  function renderView() {
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = '';

    switch(currentView) {
      case 'home':
        renderHomeView(appContainer);
        break;
      case 'share':
        renderShareView(appContainer);
        break;
      case 'leaderboard':
        renderLeaderboardView(appContainer);
        break;
      case 'profile':
        renderProfileView(appContainer);
        break;
      case 'redeem':
        renderRedeemView(appContainer);
        break;
      default:
        renderHomeView(appContainer);
    }
  }

  // Home view
  function renderHomeView(container) {
    const header = document.createElement('div');
    header.className = 'view-header';
    header.innerHTML = `
      <div class="tab-container">
        <button class="tab-button ${viewMode === 'all' ? 'active' : ''}" data-mode="all">For You</button>
        <button class="tab-button ${viewMode === 'following' ? 'active' : ''}" data-mode="following">Following</button>
      </div>
    `;
    container.appendChild(header);

    // Add event listeners for tabs
    header.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', function() {
        viewMode = this.getAttribute('data-mode');
        renderView();
      });
    });

    const postsContainer = document.createElement('div');
    postsContainer.className = 'posts-container';
    
    // Filter posts based on view mode
    let displayPosts = posts;
    if (viewMode === 'following') {
      displayPosts = posts.filter(post => 
        currentUser.following.includes(post.user)
      );
    }

    if (displayPosts.length === 0) {
      postsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>No posts yet</h3>
          <p>${viewMode === 'all' ? 'Be the first to share a post!' : 'Follow users to see their posts here'}</p>
        </div>
      `;
    } else {
      displayPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
      });
    }
    
    container.appendChild(postsContainer);
  }

  // Create post element
  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-item';
    postElement.setAttribute('data-id', post.id);
    
    const formattedDate = formatDate(post.createdAt);
    
    postElement.innerHTML = `
      <div class="post-header">
        <img src="${post.profilePicture}" alt="${post.username}" class="avatar">
        <div class="post-user-info">
          <div class="post-username">@${post.username}</div>
          <div class="post-date">${formattedDate}</div>
        </div>
        <div class="post-options">
          <button class="options-button">
            <i class="icon">⋮</i>
          </button>
        </div>
      </div>
      <div class="post-content">
        <div class="post-text">${post.content}</div>
        <div class="post-url"><a href="${post.xPostUrl}" target="_blank">${formatUrl(post.xPostUrl)}</a></div>
      </div>
      <div class="post-footer">
        <button class="action-button comment-button" title="Comment">
          <i class="icon">💬</i>
          <span class="count">${post.commentCount}</span>
        </button>
        <button class="action-button repost-button ${post.reposted ? 'active' : ''}" data-id="${post.id}" title="Repost">
          <i class="icon">🔄</i>
          <span class="count">${post.repostCount}</span>
        </button>
        <button class="action-button like-button" title="Like">
          <i class="icon">❤️</i>
          <span class="count">${post.likeCount}</span>
        </button>
        <button class="action-button share-button" title="Share">
          <i class="icon">📤</i>
        </button>
      </div>
    `;
    
    // Add event listener for repost button
    setTimeout(() => {
      const repostButton = postElement.querySelector('.repost-button');
      repostButton.addEventListener('click', function() {
        const postId = this.getAttribute('data-id');
        handleRepost(postId);
      });
    }, 0);
    
    return postElement;
  }

  // Format URL for display
  function formatUrl(url) {
    return url.replace(/https?:\/\/(www\.)?/, '').substring(0, 30) + '...';
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
      return 'just now';
    } else if (diffMin < 60) {
      return `${diffMin}m`;
    } else if (diffHour < 24) {
      return `${diffHour}h`;
    } else if (diffDay < 7) {
      return `${diffDay}d`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  }

  // Handle repost action
  function handleRepost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post && !post.reposted) {
      post.reposted = true;
      post.repostCount += 1;
      
      // If it's someone else's post, give them a point
      if (post.user !== currentUser.id) {
        const postUser = sampleData.users.find(u => u.id === post.user);
        if (postUser) {
          postUser.points += 1;
          postUser.repostsReceived += 1;
        }
      }
      
      // Update current user stats
      currentUser.repostsMade += 1;
      
      // Show success message
      showNotification('Post reposted successfully!');
      
      // Re-render view
      renderView();
    } else if (post && post.reposted) {
      showNotification('You have already reposted this post.');
    }
  }

  // Share view
  function renderShareView(container) {
    const shareForm = document.createElement('div');
    shareForm.className = 'share-form';
    shareForm.innerHTML = `
      <h2>Share Your X Post</h2>
      <p class="share-description">
        Share your X posts about consumer issues with the community. 
        For each repost you receive, you'll earn 1 point which can be 
        redeemed for real money.
      </p>
      
      <div class="input-group">
        <label for="post-url">X Post URL</label>
        <div class="input-wrapper">
          <i class="input-icon">🔗</i>
          <input type="text" id="post-url" placeholder="Paste your X post URL here">
        </div>
      </div>
      
      <div class="input-group">
        <label for="post-content">Post Content (Demo Only)</label>
        <div class="textarea-wrapper">
          <textarea id="post-content" placeholder="What's happening? Share your consumer experience..."></textarea>
          <div class="character-count">0/280</div>
        </div>
      </div>
      
      <div class="attachment-options">
        <button class="attachment-button" title="Add Photo">
          <i class="icon">🖼️</i>
        </button>
        <button class="attachment-button" title="Add GIF">
          <i class="icon">🎞️</i>
        </button>
        <button class="attachment-button" title="Add Poll">
          <i class="icon">📊</i>
        </button>
        <button class="attachment-button" title="Add Location">
          <i class="icon">📍</i>
        </button>
      </div>
      
      <button id="share-button" class="primary-button">Share Post</button>
      
      <div class="info-box">
        <div class="info-item">
          <i class="info-icon">ℹ️</i>
          <span class="info-text">Only X (Twitter) posts are supported</span>
        </div>
        <div class="info-item">
          <i class="info-icon">🔄</i>
          <span class="info-text">Earn 1 point for each repost you receive</span>
        </div>
        <div class="info-item">
          <i class="info-icon">💰</i>
          <span class="info-text">Redeem points for real money (100 points = $1)</span>
        </div>
      </div>
    `;
    container.appendChild(shareForm);
    
    // Add event listener for share button
    setTimeout(() => {
      const shareButton = document.getElementById('share-button');
      const postContent = document.getElementById('post-content');
      const characterCount = document.querySelector('.character-count');
      
      if (postContent && characterCount) {
        postContent.addEventListener('input', function() {
          const count = this.value.length;
          characterCount.textContent = `${count}/280`;
          
          if (count > 280) {
            characterCount.classList.add('over-limit');
          } else {
            characterCount.classList.remove('over-limit');
          }
        });
      }
      
      if (shareButton) {
        shareButton.addEventListener('click', function() {
          handleSharePost();
        });
      }
    }, 0);
  }

  // Handle share post action
  function handleSharePost() {
    const postUrl = document.getElementById('post-url').value;
    const postContent = document.getElementById('post-content').value;
    
    if (!postUrl) {
      showNotification('Please enter a post URL', 'error');
      return;
    }
    
    if (!postUrl.includes('x.com') && !postUrl.includes('twitter.com')) {
      showNotification('Please enter a valid X (Twitter) post URL', 'error');
      return;
    }
    
    if (postContent && postContent.length > 280) {
      showNotification('Post content exceeds 280 character limit', 'error');
      return;
    }
    
    // Create new post
    const newPost = {
      id: 'post' + (posts.length + 1),
      user: currentUser.id,
      username: currentUser.username,
      profilePicture: currentUser.profilePicture,
      xPostUrl: postUrl,
      content: postContent || 'Check out this consumer issue I found! #ConsumerRights',
      repostCount: 0,
      likeCount: 0,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      reposted: false
    };
    
    // Add to posts
    posts.unshift(newPost);
    
    // Update user stats
    currentUser.postsShared += 1;
    
    // Show success message
    showNotification('Post shared successfully!');
    
    // Navigate to home
    navigateTo('home');
  }

  // Leaderboard view
  function renderLeaderboardView(container) {
    const leaderboardHeader = document.createElement('div');
    leaderboardHeader.className = 'view-header';
    leaderboardHeader.innerHTML = `
      <h2>Leaderboard</h2>
      <p>Top users by points earned</p>
    `;
    container.appendChild(leaderboardHeader);
    
    const leaderboardList = document.createElement('div');
    leaderboardList.className = 'leaderboard-list';
    
    sampleData.leaderboard.forEach((user, index) => {
      const userElement = document.createElement('div');
      userElement.className = 'leaderboard-item';
      
      // Add special styling for top 3
      let rankClass = '';
      if (index === 0) rankClass = 'gold';
      else if (index === 1) rankClass = 'silver';
      else if (index === 2) rankClass = 'bronze';
      
      userElement.innerHTML = `
        <div class="rank ${rankClass}">${index + 1}</div>
        <img src="${user.profilePicture}" alt="${user.username}" class="avatar">
        <div class="user-info">
          <div class="username">@${user.username}</div>
        </div>
        <div class="points">
          <div class="points-value">${user.points}</div>
          <div class="points-label">points</div>
        </div>
      `;
      leaderboardList.appendChild(userElement);
    });
    
    container.appendChild(leaderboardList);
  }

  // Profile view
  function renderProfileView(container) {
    const profileHeader = document.createElement('div');
    profileHeader.className = 'profile-header';
    profileHeader.innerHTML = `
      <div class="profile-cover"></div>
      <div class="profile-info">
        <img src="${currentUser.profilePicture}" alt="${currentUser.username}" class="profile-avatar">
        <h2 class="profile-username">@${currentUser.username}</h2>
        <div class="profile-bio">Consumer rights advocate | Sharing experiences to help others</div>
        <div class="profile-meta">
          <span><i class="icon">📍</i> New York, NY</span>
          <span><i class="icon">🔗</i> bandbajaateraho.com</span>
          <span><i class="icon">📅</i> Joined May 2025</span>
        </div>
        
        <div class="profile-stats">
          <div class="stat-group">
            <span class="stat-value">${currentUser.following.length}</span>
            <span class="stat-label">Following</span>
          </div>
          <div class="stat-group">
            <span class="stat-value">128</span>
            <span class="stat-label">Followers</span>
          </div>
        </div>
      </div>
      
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-value">${currentUser.points}</div>
          <div class="stat-label">Points</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${currentUser.postsShared}</div>
          <div class="stat-label">Posts</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${currentUser.repostsReceived}</div>
          <div class="stat-label">Reposts</div>
        </div>
      </div>
      
      <button id="redeem-button" class="primary-button">Redeem Points</button>
    `;
    container.appendChild(profileHeader);
    
    const profileContent = document.createElement('div');
    profileContent.className = 'profile-content';
    
    // Profile tabs
    const profileTabs = document.createElement('div');
    profileTabs.className = 'profile-tabs';
    profileTabs.innerHTML = `
      <button class="profile-tab active">Posts</button>
      <button class="profile-tab">Reposts</button>
      <button class="profile-tab">Points</button>
    `;
    profileContent.appendChild(profileTabs);
    
    // User posts
    const userPosts = posts.filter(post => post.user === currentUser.id);
    const postsContainer = document.createElement('div');
    postsContainer.className = 'posts-container';
    
    if (userPosts.length === 0) {
      postsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>No posts yet</h3>
          <p>Share your first post to start earning points!</p>
        </div>
      `;
    } else {
      userPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
      });
    }
    
    profileContent.appendChild(postsContainer);
    container.appendChild(profileContent);
    
    // Add event listener for redeem button
    setTimeout(() => {
      const redeemButton = document.getElementById('redeem-button');
      if (redeemButton) {
        redeemButton.addEventListener('click', function() {
          navigateTo('redeem');
        });
      }
    }, 0);
  }

  // Redeem view
  function renderRedeemView(container) {
    const redeemForm = document.createElement('div');
    redeemForm.className = 'redeem-form';
    redeemForm.innerHTML = `
      <h2>Redeem Points</h2>
      <p class="redeem-description">
        Convert your points to real money! Each 100 points equals $1.
        Minimum redemption is 500 points ($5).
      </p>
      
      <div class="points-balance">
        <div class="balance-label">Your Points Balance</div>
        <div class="balance-value">${currentUser.points}</div>
      </div>
      
      <div class="input-group">
        <label for="points-amount">Points to Redeem</label>
        <div class="input-wrapper">
          <i class="input-icon">💰</i>
          <input type="number" id="points-amount" placeholder="Enter points (minimum 500)" min="500" max="${currentUser.points}" value="500">
        </div>
        <div class="conversion-text" id="conversion-text">= $5.00</div>
        <div class="slider-container">
          <input type="range" min="500" max="${currentUser.points}" value="500" step="100" class="points-slider" id="points-slider">
          <div class="slider-labels">
            <span>500</span>
            <span>${currentUser.points}</span>
          </div>
        </div>
      </div>
      
      <div class="input-group">
        <label>Payment Method</label>
        <div class="payment-options">
          <div class="payment-option active" data-method="paypal">
            <i class="payment-icon">💳</i>
            <span class="payment-name">PayPal</span>
          </div>
          <div class="payment-option" data-method="bank">
            <i class="payment-icon">🏦</i>
            <span class="payment-name">Bank Transfer</span>
          </div>
          <div class="payment-option" data-method="crypto">
            <i class="payment-icon">₿</i>
            <span class="payment-name">Crypto</span>
          </div>
        </div>
      </div>
      
      <div class="input-group">
        <label for="payment-email">Payment Email</label>
        <div class="input-wrapper">
          <i class="input-icon">✉️</i>
          <input type="email" id="payment-email" placeholder="Enter your payment email">
        </div>
      </div>
      
      <button id="redeem-submit" class="primary-button">Redeem Now</button>
      
      <div class="redemption-history">
        <h3>Redemption History</h3>
        ${sampleData.transactions.map(tx => `
          <div class="history-item">
            <div class="history-left">
              <i class="history-icon ${tx.status === 'completed' ? 'completed' : 'pending'}">
                ${tx.status === 'completed' ? '✅' : '⏳'}
              </i>
              <div class="history-details">
                <div class="history-amount">$${tx.amount.toFixed(2)} (${tx.points} points)</div>
                <div class="history-date">${new Date(tx.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}</div>
              </div>
            </div>
            <div class="history-status ${tx.status}">${tx.status}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="info-box">
        <div class="info-item">
          <i class="info-icon">⏱️</i>
          <span class="info-text">Redemption requests are processed within 3-5 business days</span>
        </div>
        <div class="info-item">
          <i class="info-icon">🔒</i>
          <span class="info-text">Your payment information is secure and encrypted</span>
        </div>
      </div>
    `;
    container.appendChild(redeemForm);
    
    // Add event listeners
    setTimeout(() => {
      // Points amount input and slider
      const pointsInput = document.getElementById('points-amount');
      const pointsSlider = document.getElementById('points-slider');
      const conversionText = document.getElementById('conversion-text');
      
      if (pointsInput && conversionText) {
        pointsInput.addEventListener('input', function() {
          const points = parseInt(this.value) || 0;
          const amount = (points / 100).toFixed(2);
          conversionText.textContent = `= $${amount}`;
          
          if (pointsSlider) {
            pointsSlider.value = points;
          }
        });
      }
      
      if (pointsSlider && pointsInput && conversionText) {
        pointsSlider.addEventListener('input', function() {
          const points = parseInt(this.value);
          pointsInput.value = points;
          const amount = (points / 100).toFixed(2);
          conversionText.textContent = `= $${amount}`;
        });
      }
      
      // Payment method selection
      const paymentOptions = document.querySelectorAll('.payment-option');
      paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
          paymentOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');
        });
      });
      
      // Redeem button
      const redeemButton = document.getElementById('redeem-submit');
      if (redeemButton) {
        redeemButton.addEventListener('click', function() {
          handleRedeemPoints();
        });
      }
    }, 0);
  }

  // Handle redeem points action
  function handleRedeemPoints() {
    const pointsAmount = parseInt(document.getElementById('points-amount').value) || 0;
    const paymentEmail = document.getElementById('payment-email').value;
    const paymentMethod = document.querySelector('.payment-option.active').getAttribute('data-method');
    
    if (pointsAmount < 500) {
      showNotification('Please enter at least 500 points to redeem', 'error');
      return;
    }
    
    if (pointsAmount > currentUser.points) {
      showNotification('You don\'t have enough points', 'error');
      return;
    }
    
    if (!paymentEmail) {
      showNotification('Please enter your payment email', 'error');
      return;
    }
    
    // Create transaction
    const newTransaction = {
      id: 'tx' + (sampleData.transactions.length + 1),
      points: pointsAmount,
      amount: pointsAmount / 100,
      status: 'pending',
      paymentMethod: paymentMethod,
      createdAt: new Date().toISOString()
    };
    
    // Add to transactions
    sampleData.transactions.unshift(newTransaction);
    
    // Update user points
    currentUser.points -= pointsAmount;
    
    // Show success message
    showNotification(`Redemption request for $${(pointsAmount / 100).toFixed(2)} submitted successfully!`);
    
    // Navigate to profile
    navigateTo('profile');
  }

  // Show notification
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="notification-icon">${type === 'success' ? '✅' : '❌'}</i>
      <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation class after a small delay
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Initialize the app
  initApp();
});
