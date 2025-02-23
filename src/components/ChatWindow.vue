<template>
  <main class="chat-container">
    <div class="chat-header">
      <el-input v-model="searchQuery" placeholder="关键词搜索" :prefix-icon="Search" clearable class="search-input" />
      <!-- <el-date-picker v-model="selectedDate" style="width: 300px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="date-picker" /> -->
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="`全部（${statisticsObject?.allCount ?? 0}）`" name="tab1">
        <ChatBox v-if="selectedFriend" :friend="selectedFriend" />
      </el-tab-pane>
      <el-tab-pane :label="`资金（${statisticsObject?.fundCount ?? 0}）`" name="tab2">
        <!-- <ChatTabContent :messages="filteredMessages" /> -->
      </el-tab-pane>
      <el-tab-pane :label="`文件（${statisticsObject?.fileCount ?? 0}）`" name="tab3">
        <!-- <ChatTabContent :messages="filteredMessages" /> -->
      </el-tab-pane>
      <el-tab-pane :label="`位置（${statisticsObject?.positionCount ?? 0}）`" name="tab4">
        <!-- <ChatTabContent :messages="filteredMessages" /> -->
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';
import { ElInput, ElDatePicker, ElTabs, ElTabPane } from 'element-plus';
import ChatTabContent from './chat';
import { Search } from '@element-plus/icons-vue';
import { imApi } from '@/api';

const props = defineProps<{ selectedFriend: IFriendItem | null, }>();

// 统计数据
const statisticsObject = ref<IStatisticsObject>()
const initStatistics = async () => {
  if (!props.selectedFriend?.id) return;
  statisticsObject.value = await imApi.getStatisticsObject({
    objectId: props.selectedFriend?.id,
  })
}
watch(() => props.selectedFriend?.id, async () => {
  initStatistics()
}, {
  immediate: true
})
// 消息
// const messages = ref<IChatDataResponse>();
// const page = reactive({
//   current: 1,
//   size: 10,
// })
// const initMessages = async () => {
//   if (!props.selectedFriend?.id) return;
//   messages.value = await imApi.getMessageList({
//     objectId: props.selectedFriend?.id,
//     ...page
//   })
// }
// watch(() => props.selectedFriend?.id, async () => {
//   initMessages()
// }, {
//   immediate: true
// })
// const handlePageChange = (pages: IPage) => {
//   page.current = pages.current;
//   page.size = pages.size;
//   initMessages()
// }

const searchQuery = ref<string>('');
const selectedDate = ref<[Date, Date] | null>(null);
const activeTab = ref<string>('tab1');

// const filteredMessages = computed(() => {
//   return props.messages.filter(message => {
//     const matchesQuery = message.content.includes(searchQuery.value);
//     const matchesDate = selectedDate.value ? new Date(message.timestamp) >= selectedDate.value[0] && new Date(message.timestamp) <= selectedDate.value[1] : true;
//     return matchesQuery && matchesDate;
//   });
// });
</script>

<style scoped lang="scss">
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.chat-header {
  display: inline-flex;
  align-items: center;
  padding: 10px;
  padding-left: 0;
  padding-right: 0px;
  border-bottom: 1px solid #ccc;

  .search-input {
    margin-right: 10px;
    width: 300px;
  }

  .date-picker {
    color: red;
    flex: 1;
    width: 300px;
  }
}


.el-tabs {
  flex: 1;
  overflow: hidden;
}
</style>