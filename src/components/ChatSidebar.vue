<template>
  <aside class="sidebar">
    <div class="search">
      <el-input v-model="searchQuery" clearable placeholder="搜索/搜索联系人..." :prefix-icon="Search" />
    </div>
    <div class="friends-list">
      <el-scrollbar>
        <div v-for="(friend, index) in filteredFriends" :key="index" class="friend-item" @click="() => selectFriend(friend)">
          <img :src="friend.avatar" class="avatar" />
          <div class="friend-info">
            <span class="friend-name">{{ friend.name }}</span>
            <span class="recent-message">{{ recentMessages[friend.name]?.content }}</span>
            <span class="timestamp">{{ dayjs(recentMessages[friend.name]?.timestamp).format(`MM月DD日`) }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { ElInput, ElScrollbar } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

interface Friend {
  name: string;
  avatar: string;
}

const props = defineProps<{ friends: Friend[], recentMessages: { [key: string]: any } }>();
const emit = defineEmits<{ (e: 'selectFriend', friend: Friend): void }>();

const searchQuery = ref<string>('');

const filteredFriends = computed(() => {
  return props.friends.filter(friend => friend.name.includes(searchQuery.value));
});

const selectFriend = (friend: Friend) => {
  emit('selectFriend', friend);
};
</script>

<style scoped>
.sidebar {
  width: 300px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

.search {
  padding: 10px;
}

.friends-list {
  flex: 1;
  overflow: hidden;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.friend-item:hover {
  background-color: #f9f9f9;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.friend-info {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.friend-name {
  font-weight: bold;
}

.recent-message {
  color: gray;
  font-size: 12px;
}
.timestamp {
  position: absolute;
  right: 10px;
  top: 0px;
  color: gray;
  font-size: 10px;
}
</style>