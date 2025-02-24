<template>
  <main class="chat-container">
    <!-- <div class="chat-header">
      <el-input v-model="searchQuery" placeholder="关键词搜索" :prefix-icon="Search" clearable class="search-input" />
      <el-date-picker v-model="selectedDate" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" class="date-picker" />
      <el-button style="margin-left: 10px;" type="primary" @click="handleSearch">搜索</el-button>
    </div> -->
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="`全部（${statisticsObject?.allCount ?? 0}）`" name="tab1">
        <ChatBox v-if="selectedFriend" :friend="selectedFriend" />
      </el-tab-pane>
      <el-tab-pane :label="`搜索结果（${searchCount ?? 0}）`" name="search">
        <div v-if="selectedFriend" class="search-layout">
          <SearchList ref="searchListRef" class="search-left" :messages="searchList" :keyword="searchQuery"
            @select="handleSkipToMessage" />
          <!-- <ChatBox ref="searchBoxRef" class="search-right" v-if="selectedFriend" :friend="selectedFriend" /> -->
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane :label="`资金（${statisticsObject?.fundCount ?? 0}）`" name="tab2">
      </el-tab-pane>
      <el-tab-pane :label="`文件（${statisticsObject?.fileCount ?? 0}）`" name="tab3">
      </el-tab-pane>
      <el-tab-pane :label="`位置（${statisticsObject?.positionCount ?? 0}）`" name="tab4">
      </el-tab-pane> -->
    </el-tabs>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';
import { ElInput, ElDatePicker, ElTabs, ElTabPane } from 'element-plus';
import dayjs from 'dayjs';
import ChatTabContent from './chat';
import { Search } from '@element-plus/icons-vue';
import { imApi } from '@/api';
import ChatBox from '@/components/ChatBox.vue'
const props = defineProps<{ selectedFriend: IFriendItem | null, }>();

// 统计数据
const statisticsObject = ref<IStatisticsObject>()
const initStatistics = async () => {
  if (!props.selectedFriend?.id) {
    // 返回promise
    statisticsObject.value = {
      allCount: 0,
      fundCount: 0,
      fileCount: 0,
      positionCount: 0,
    }
  } else {
    statisticsObject.value = await imApi.getStatisticsObject({
      objectId: props.selectedFriend?.id,
    })
  }

}
watch(() => props.selectedFriend?.id, async () => {
  await initStatistics()
}, {
  immediate: true
})
// 搜索
const searchCount = ref<number>(0);
const searchList = ref<IGetObjectChatSearchData[]>([]);


const searchQuery = ref<string>('');
const selectedDate = ref('');
const activeTab = ref<string>('tab1');
// 跳转消息
const searchBoxRef = ref(null);
const handleSkipToMessage = (message: IGetObjectChatSearchData) => {
  // 跳转到指定消息
  // alert(JSON.stringify(message))
  searchBoxRef.value?.handleSkip(message)
  // 可以使用滚动到指定消息的逻辑
}

const searchListRef = ref(null);
const handleActiveTabChange = async (tab: string, content: string, date: Array<any>) => {
  if (tab) {
    activeTab.value = tab;
  }
  const list = await imApi.getChatSearchApi({
    objectId: props.selectedFriend?.id,
    content: content,
    size: 2,
    beginTime: date ? dayjs(date[0]).format('YYYY-MM-DD 00:00:00') : '',
    endTime: date ? dayjs(date[1]).format('YYYY-MM-DD 23:59:59') : '',
  });
  searchList.value = list;
  searchCount.value = list.length;
  await nextTick();
  // 选中第一个
  if (list.length > 0) {
    searchQuery.value = content;
    searchListRef.value?.selectItem(list[0])
  }
  
}
defineExpose({
  handleActiveTabChange,
})
</script>

<style scoped lang="scss">
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

// .chat-header {
//   // display: inline-flex;
//   // align-items: center;
//   padding: 10px;
//   padding-left: 0;
//   padding-right: 0px;
//   border-bottom: 1px solid #ccc;

//   .search-input {
//     margin-right: 10px;
//     width: 300px;
//   }

//   .date-picker {
//     // color: red;
//     // flex: 1;
//     width: 300px;
//     margin-right: 10px;
//   }
// }

.search-layout {
  display: flex;
  // flex: 1;
  width: 100%;
  overflow: hidden;
}

.search-left {
  width: 200px;
  overflow: auto;
}

.search-right {
  flex: 1;
  overflow: auto;
}


.el-tabs {
  flex: 1;
  overflow: hidden;
}
</style>