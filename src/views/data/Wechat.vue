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
      <ChatWindow ref="chatWindowRef" :selectedFriend="selectedFriend" :node="node" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

import Sidebar from '@/components/ChatSidebar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import dayjs from 'dayjs';
import { imApi } from '@/api';
defineProps(['node'])

const selectedFriend = ref<IFriendItem | null>(null);


const selectFriend = (friend: IFriendItem) => {
  selectedFriend.value = friend;
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
  // if (!selectedFriend?.id) return;
  // 执行搜索前先刷新好友列表
  await handleRefreshAndSelect(searchQuery.value);
  // await nextTick();
  chatWindowRef.value?.handleActiveTabChange('search', searchQuery.value, selectedDate.value)
  // const list = await imApi.getChatSearchApi({
  //   objectId: selectedFriend?.id,
  //   content: searchQuery.value,
  //   size: 2,
  //   beginTime: selectedDate.value ? dayjs(selectedDate.value[0]).format('YYYY-MM-DD 00:00:00') : '',
  //   endTime: selectedDate.value ? dayjs(selectedDate.value[1]).format('YYYY-MM-DD 23:59:59') : '',
  // });

  // searchList.value = list;
  // searchCount.value = list.length;
  // activeTab.value = 'search';

  // 自动选中第一个搜索结果
  // if (list.length > 0) {
  //   handleSkipToMessage(list[0]);
  // }
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