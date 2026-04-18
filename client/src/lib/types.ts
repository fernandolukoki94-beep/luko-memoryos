// User profile type
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  followers: number;
  following: number;
  createdAt: number;
  updatedAt: number;
}

// Post type (Instagram-style)
export interface Post {
  id: string;
  uid: string;
  author: UserProfile;
  caption: string;
  imageURL: string;
  likes: number;
  comments: number;
  createdAt: number;
  updatedAt: number;
  likedBy: string[]; // Array of user IDs who liked this post
}

// Comment type
export interface Comment {
  id: string;
  postId: string;
  uid: string;
  author: UserProfile;
  text: string;
  createdAt: number;
  likes: number;
}

// Story type
export interface Story {
  id: string;
  uid: string;
  author: UserProfile;
  imageURL: string;
  createdAt: number;
  expiresAt: number; // Stories expire after 24 hours
  viewedBy: string[];
}

// Chat message type (WhatsApp-style)
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderPhotoURL?: string;
  text: string;
  imageURL?: string;
  createdAt: number;
  readBy: string[];
  isDeleted?: boolean;
}

// Conversation type
export interface Conversation {
  id: string;
  participants: string[]; // Array of user IDs
  participantDetails: UserProfile[];
  lastMessage?: ChatMessage;
  lastMessageTime: number;
  createdAt: number;
  updatedAt: number;
  unreadCount: number;
}

// Notification type
export interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "follow" | "message";
  fromUserId: string;
  fromUserName: string;
  postId?: string;
  conversationId?: string;
  message: string;
  read: boolean;
  createdAt: number;
}

// Follow relationship
export interface FollowRelationship {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: number;
}
