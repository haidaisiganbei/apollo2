<template>
  <div class="app">
    <Sidebar :node="node" @selectFriend="selectFriend" />
    <ChatWindow  :selectedFriend="selectedFriend" :node="node"  />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Sidebar from '@/components/ChatSidebar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
defineProps(['node'])

const selectedFriend = ref<IFriendItem | null>(null);

// const messages = ref<Message[]>([
//   { sender: 'me', content: '你好，Alice！', timestamp: '2025-02-18 01:00:00' },
//   { sender: 'friend', content: '你好，你好！', timestamp: '2025-02-18 01:05:00' },
// ]);

// const recentMessages = ref<{ [key: string]: { content: string; timestamp: string } }>({
//   Alice: { content: '你好，Alice！', timestamp: '2025-02-18 01:00:00' },
//   Bob: { content: '你好，你好！', timestamp: '2025-02-18 01:05:00' },
//   // 更多最近消息...
// });

const selectFriend = (friend: IFriendItem) => {
  selectedFriend.value = friend;
  // 加载选中好友的聊天记录，省略实现
};

// const sendMessage = (message: string) => {
//   if (message.trim() && selectedFriend.value) {
//     const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
//     messages.value.push({ sender: 'me', content: message, timestamp });
//     recentMessages.value[selectedFriend.value.name] = { content: message, timestamp };
//   }
// };
</script>

<style scoped>
.app {
  display: flex;
  height: calc(100vh - 160px);
}
</style>