<template>
  <div class="tab-content">
    <div id="timeline-chart" class="timeline-chart"></div>
    <div class="content">
      <div class="messages">
        <div v-for="(message, index) in paginatedMessages" :key="index" :class="['message', message.sender]">
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
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="totalMessages"
        :page-size="messagesPerPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'element-plus/es/components/pagination/style/css';
import { ElPagination } from 'element-plus';

interface Message {
  sender: 'me' | 'friend';
  content: string;
  timestamp: string;
  type: 'text' | 'audio' | 'image' | 'gif' | 'emoji' | 'video' | 'link' | 'share' | 'red-envelope' | 'business-card';
  title?: string;
  description?: string;
  thumbnail?: string;
  avatar?: string;
  name?: string;
}

const defaultAvatarMe = 'https://randomuser.me/api/portraits/men/84.jpg'; // Replace with actual path to your default avatar for 'me'
const defaultAvatarFriend = 'https://randomuser.me/api/portraits/women/90.jpg'; // Replace with actual path to your default avatar for 'friend'

const messages = ref<Message[]>([
  { sender: 'me', content: 'Hello!', timestamp: '2025-02-18T08:00:00', type: 'text' },
  { sender: 'friend', content: 'Hi there!', timestamp: '2025-02-18T08:05:00', type: 'text' },
  { sender: 'me', content: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', timestamp: '2025-02-18T08:10:00', type: 'audio' },
  { sender: 'friend', content: 'That sounds great!', timestamp: '2025-02-18T08:15:00', type: 'text' },
  { sender: 'me', content: 'https://placekitten.com/300/300', timestamp: '2025-02-18T08:20:00', type: 'image' },
  { sender: 'friend', content: 'https://media.giphy.com/media/3o7aCPaRnzfzYxqGZG/giphy.gif', timestamp: '2025-02-18T08:25:00', type: 'gif' },
  { sender: 'me', content: 'https://img.icons8.com/emoji/48/000000/smiling-face-with-sunglasses.png', timestamp: '2025-02-18T08:30:00', type: 'emoji' },
  { sender: 'friend', content: 'https://www.w3schools.com/html/mov_bbb.mp4', timestamp: '2025-02-18T08:35:00', type: 'video' },
  { sender: 'me', content: 'https://www.example.com', timestamp: '2025-02-18T08:40:00', type: 'link' },
  { sender: 'friend', content: 'Check out this cool app!', timestamp: '2025-02-18T08:45:00', type: 'share', title: 'Cool App', description: 'This is a cool app!', thumbnail: 'https://via.placeholder.com/150' },
  { sender: 'me', content: '恭喜发财，大吉大利！', timestamp: '2025-02-18T08:50:00', type: 'red-envelope' },
  { sender: 'friend', content: '', timestamp: '2025-02-18T08:55:00', type: 'business-card', name: 'John Doe', title: 'Software Engineer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
]);

const chart = ref<echarts.ECharts | null>(null);

const initChart = () => {
  const chartDom = document.getElementById('timeline-chart')!;
  chart.value = echarts.init(chartDom);
  const option = {
    grid: {
      top: 20,
      bottom: 20,
      left: 80,
      right: 60,
    },
    yAxis: {
      type: 'category',
      data: ['2024年01月', '2024年02月', '2024年03月', '2024年04月', '2024年05月', '2024年06月', '2024年07月']
    },
    xAxis: {
      type: 'value',
      show: false // Hide the x-axis
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '10px', // Modify this value to adjust the width of each bar
        label: {
          show: true,
          position: 'right' // Position of the label to display it outside the bar
        }
      }
    ]
  };

  chart.value.setOption(option);
};

onMounted(initChart);

// 格式化时间戳函数
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() === date.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday) {
    return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
};

const messagesPerPage = 10;
const currentPage = ref(1);

const messagesWithTimestamps = computed(() => {
  const result: Array<Message & { showTimestamp: boolean }> = [];
  let lastTimestamp = 0;

  for (const message of messages.value) {
    const messageTimestamp = new Date(message.timestamp).getTime();
    const showTimestamp = messageTimestamp - lastTimestamp > 5 * 60 * 1000;
    if (showTimestamp) {
      lastTimestamp = messageTimestamp;
    }
    result.push({ ...message, showTimestamp });
  }

  return result;
});

const totalMessages = computed(() => messagesWithTimestamps.value.length);

const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * messagesPerPage;
  const end = start + messagesPerPage;
  return messagesWithTimestamps.value.slice(start, end);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleRobotClick = (message: Message) => {
  console.log("Robot icon clicked for message:", message);
};
</script>

<style scoped lang="scss">
.tab-content {
  display: flex;
  height: calc(100vh - 260px); 
  overflow: hidden;
}

.timeline-chart {
  width: 260px;
  height: calc(100vh - 260px);
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  background-color: #F5F5F5;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.messages {
  flex: 1;
  overflow-y: auto;
}

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

.timestamp {
  font-size: 0.8em;
  color: #999;
  text-align: center;
  margin: 10px 0;
}

.text {
  margin: 0;
  font-size: 0.9em;
  color: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
}
</style>