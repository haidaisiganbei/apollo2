<template>
  <div class="message" :class="message.sender">
    <img :src="message.sender === 'me' ? defaultAvatarMe : defaultAvatarFriend" class="avatar" />
    <div class="message-container">
      <div class="message-header">
        <span class="username">{{ message.sender === 'me' ? 'My Username' : 'Friend\'s Username' }}</span>
        <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
      </div>
      <div class="message-content">
        <p v-if="message.type === 'text'" class="text">{{ message.content }}</p>
        <audio v-if="message.type === 'audio'" controls>
          <source :src="message.content" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <img v-if="message.type === 'image'" :src="message.content" class="image-message" />
        <img v-if="message.type === 'gif'" :src="message.content" class="image-message" />
        <img v-if="message.type === 'emoji'" :src="message.content" class="emoji-message" />
        <video v-if="message.type === 'video'" controls>
          <source :src="message.content" type="video/mp4">
          Your browser does not support the video element.
        </video>
        <a v-if="message.type === 'link'" :href="message.content" target="_blank" class="link-message">{{ message.content }}</a>
        <div v-if="message.type === 'share'" class="share-message">
          <img :src="message.thumbnail" class="share-thumbnail" />
          <div class="share-content">
            <h4>{{ message.title }}</h4>
            <p>{{ message.description }}</p>
          </div>
        </div>
        <div v-if="message.type === 'red-envelope'" class="red-envelope">
          <div class="red-envelope-content">
            <p>{{ message.content }}</p>
            <span>红包</span>
          </div>
        </div>
        <div v-if="message.type === 'business-card'" class="business-card">
          <img :src="message.avatar" class="business-card-avatar" />
          <div class="business-card-content">
            <h4>{{ message.name }}</h4>
            <p>{{ message.title }}</p>
          </div>
        </div>
        <div v-if="message.type === 'transfer'" class="transfer-message">
          <div class="transfer-content">
            <p>{{ message.content }}</p>
            <span>转账</span>
          </div>
        </div>
      </div>
    </div>
    <img 
      v-if="message.sender === 'me'" 
      src="https://img.icons8.com/color/48/000000/android-os.png" 
      class="robot-icon-left" 
      @click="handleRobotClick(message)" 
    />
    <img 
      v-else 
      src="https://img.icons8.com/color/48/000000/android-os.png" 
      class="robot-icon-right" 
      @click="handleRobotClick(message)" 
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface Message {
  sender: 'me' | 'friend';
  content: string;
  timestamp: string;
  type: 'text' | 'audio' | 'image' | 'gif' | 'emoji' | 'video' | 'link' | 'share' | 'red-envelope' | 'business-card' | 'transfer';
  title?: string;
  description?: string;
  thumbnail?: string;
  avatar?: string;
  name?: string;
}

const props = defineProps<{
  message: Message;
  defaultAvatarMe: string;
  defaultAvatarFriend: string;
  formatTimestamp: (timestamp: string) => string;
  handleRobotClick: (message: Message) => void;
}>();
</script>

<style scoped lang="scss">
.message {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
}

.message-container {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.me {
  flex-direction: row-reverse;

  .robot-icon-left {
    margin-left: 10px;
    align-self: center;
  }
}

.friend {
  flex-direction: row;

  .robot-icon-right {
    margin-left: 10px;
    align-self: center;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.message-content {
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  audio, video {
    width: 100%;
    margin-top: 5px;
  }

  .image-message {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 5px;
  }

  .emoji-message {
    width: 48px;
    height: 48px;
    margin-top: 5px;
  }

  .link-message {
    color: #1E90FF;
    text-decoration: underline;
    word-break: break-all;
  }

  .share-message {
    display: flex;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-top: 5px;

    .share-thumbnail {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      margin-right: 10px;
    }

    .share-content {
      display: flex;
      flex-direction: column;

      h4 {
        margin: 0;
        font-size: 0.9em;
        font-weight: bold;
        color: #333;
      }

      p {
        margin: 5px 0 0 0;
        font-size: 0.8em;
        color: #666;
      }
    }
  }

  .red-envelope {
    display: flex;
    align-items: center;
    background-color: #FF4500;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: white;
    margin-top: 5px;

    .red-envelope-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 0;
        font-size: 0.9em;
        color: white;
      }

      span {
        margin-top: 5px;
        font-size: 1em;
        font-weight: bold;
      }
    }
  }

  .business-card {
    display: flex;
    align-items: center;
    background-color: #f6f7f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-top: 5px;

    .business-card-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .business-card-content {
      display: flex;
      flex-direction: column;

      h4 {
        margin: 0;
        font-size: 1em;
        font-weight: bold;
        color: #333;
      }

      p {
        margin: 2px 0 0 0;
        font-size: 0.9em;
        color: #666;
      }
    }
  }

  .transfer-message {
    display: flex;
    align-items: center;
    background-color: #FFD700;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    color: black;
    margin-top: 5px;

    .transfer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 0;
        font-size: 0.9em;
        color: black;
      }

      span {
        margin-top: 5px;
        font-size: 1em;
        font-weight: bold;
      }
    }
  }
}

.message-header {
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  .username {
    font-weight: bold;
    font-size: 0.9em;
    color: #333;
    margin-right: 5px;
  }

  .timestamp {
    font-size: 0.8em;
    color: #999;
  }
}

.robot-icon-left, .robot-icon-right {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>