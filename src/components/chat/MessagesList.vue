<template>
  <div class="messages">
    <MessageComponent
      v-for="(message, index) in paginatedMessages"
      :key="index"
      :message="message"
      :defaultAvatarMe="defaultAvatarMe"
      :defaultAvatarFriend="defaultAvatarFriend"
      :formatTimestamp="formatTimestamp"
      :handleRobotClick="handleRobotClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import MessageComponent from './MessageComponent.vue';

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

const props = defineProps<{
  messages: Message[];
  defaultAvatarMe: string;
  defaultAvatarFriend: string;
  formatTimestamp: (timestamp: string) => string;
  handleRobotClick: (message: Message) => void;
  currentPage: number;
  messagesPerPage: number;
  onPageChange: (page: number) => void;
}>();

const paginatedMessages = computed(() => {
  const start = (props.currentPage - 1) * props.messagesPerPage;
  const end = start + props.messagesPerPage;
  return props.messages.slice(start, end);
});

watch(() => props.currentPage, () => {
  props.onPageChange(props.currentPage);
});
</script>

<style scoped lang="scss">
.messages {
  flex: 1;
  overflow-y: auto;
}
</style>