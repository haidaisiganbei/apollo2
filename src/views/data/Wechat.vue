<template>
  <div class="app">
    <Sidebar ref="sidebarRef" :node="node" @selectFriend="selectFriend" />
    <div class="chat-container">
      <div class="chat-header">
        <el-input v-model="searchQuery" placeholder="关键词搜索" :prefix-icon="Search" clearable class="search-input" />
        <el-date-picker v-model="selectedDate" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" class="date-picker" />
        <el-button style="margin-left: 10px;" type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <ChatWindow ref="chatWindowRef" :selectedFriend="selectedFriend" :node="node" :searchQuery="searchQuery"
        :selectedDate="selectedDate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

import Sidebar from '@/components/ChatSidebar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
const props = defineProps(['node'])

const selectedFriend = ref<IFriendItem | null>(null);
provide('computer', props.node);
provide('friend', selectedFriend);


const selectFriend = async (friend: IFriendItem) => {
  selectedFriend.value = friend;
  await nextTick();
  // 加载选中好友的聊天记录，省略实现
  chatWindowRef.value?.handleActiveTabChange(undefined, searchQuery.value, selectedDate.value)
};

const sidebarRef = ref();

// 处理好友刷新和选择
const handleRefreshAndSelect = async (keyword: string) => {
  if (sidebarRef.value) {
    // 刷新好友列表
    await sidebarRef.value.refreshFriends(keyword);
    await nextTick();
  }
};

const searchQuery = ref<string>('');
const selectedDate = ref('');
const chatWindowRef = ref();
const handleSearch = async () => {
  // 执行搜索前先刷新好友列表
  await handleRefreshAndSelect(searchQuery.value);
  await nextTick();
  await chatWindowRef.value?.handleActiveTabChange('search', searchQuery.value, selectedDate.value)
}
</script>

<style scoped lang="scss">
.app {
  display: flex;
  height: calc(100vh - 160px);
}

.chat-container {
  flex: 1;
}

.chat-header {
  // display: inline-flex;
  // align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  .search-input {
    margin-right: 10px;
    width: 300px;
  }

  .date-picker {
    // color: red;
    // flex: 1;
    width: 300px;
    margin-right: 10px;
  }
}
</style>