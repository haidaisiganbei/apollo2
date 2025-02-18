<template>
  <div class="tab-content">
    <div id="timeline-chart" class="timeline-chart"></div>
    <div class="content">
      <MessagesList
        :messages="messages"
        :defaultAvatarMe="defaultAvatarMe"
        :defaultAvatarFriend="defaultAvatarFriend"
        :formatTimestamp="formatTimestamp"
        :handleRobotClick="handleRobotClick"
        :currentPage="currentPage"
        :messagesPerPage="messagesPerPage"
        :onPageChange="handlePageChange"
      />
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
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';
import 'element-plus/es/components/pagination/style/css';
import { ElPagination } from 'element-plus';
import MessagesList from './MessagesList.vue';

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
  { sender: 'friend', content: '', timestamp: '2025-02-18T08:55:00', type: 'business-card', name: 'John Doe', title: 'Software Engineer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { sender: 'me', content: '转账100元', timestamp: '2025-02-18T09:00:00', type: 'transfer' }
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

const totalMessages = computed(() => messages.value.length);

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