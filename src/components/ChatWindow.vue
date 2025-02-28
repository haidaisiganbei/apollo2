<template>
  <main class="chat-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="`全部（${statisticsObject?.allCount ?? 0}）`" name="tab1">
      </el-tab-pane>
      <el-tab-pane v-if="hasSearch" :label="`搜索结果（${searchCount ?? 0}）`" name="search" lazy>
      </el-tab-pane>
      <el-tab-pane :label="`资金（${statisticsObject?.fundCount ?? 0}）`" name="tab2" lazy>
        <!-- <ChatBox v-if="selectedFriend" :node="node" :friend="selectedFriend" /> -->
      </el-tab-pane>
      <el-tab-pane :label="`文件（${statisticsObject?.fileCount ?? 0}）`" name="tab3" lazy>
      </el-tab-pane>
      <el-tab-pane :label="`位置（${statisticsObject?.positionCount ?? 0}）`" name="tab4" lazy>
      </el-tab-pane>
    </el-tabs>
    <template v-if="activeTab == 'tab1'">
      <ChatBox v-if="selectedFriend" style="width:100%" :node="node" :friend="selectedFriend" />
    </template>
    <template v-if="activeTab == 'search'">
      <div v-if="selectedFriend" class="search-layout">
        <template v-if="searchList.length">
          <SearchList ref="searchListRef" class="search-left" :messages="searchList" :keyword="searchQuery"
            @select="handleSkipToMessage" />
          <ChatBox ref="searchBoxRef" class="search-right" v-if="selectedFriend" :node="node" :friend="selectedFriend"
            :selectedDate="selectedDate" />
        </template>
        <template v-else>
          <el-empty description="暂无数据" />
        </template>
      </div>
    </template>
    <template v-if="activeTab == 'tab2'">
      <ChatBox v-if="selectedFriend" style="width:100%" :node="node" :friend="selectedFriend"
        :selectedDate="selectedDate" :msg-type="[6, 8]" />
    </template>
    <template v-if="activeTab == 'tab3'">
      <ChatBox v-if="selectedFriend" style="width:100%" :node="node" :friend="selectedFriend"
        :selectedDate="selectedDate" :msg-type="[71]" />
    </template>
    <template v-if="activeTab == 'tab4'">
      <ChatBox v-if="selectedFriend" style="width:100%" :node="node" :friend="selectedFriend"
        :selectedDate="selectedDate" :msg-type="[42, 57, 64]" />
    </template>
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
const props = defineProps<{
  selectedFriend: IFriendItem | null,
  searchQuery: string,
  selectedDate: any,
  node: IComputerTreeNode,
}>();

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
      computerId: String(props.node.id),
      beginTime: props.selectedDate ? dayjs(props.selectedDate[0]).format('YYYY-MM-DD 00:00:00') : '',
      endTime: props.selectedDate ? dayjs(props.selectedDate[1]).format('YYYY-MM-DD 23:59:59') : '',
    })
  }

}
// 好友切换
watch(() => [props.selectedFriend?.id], async () => {
  await initStatistics()
}, {
  immediate: true
})
// 日期切换
watch(() => [props.selectedDate], async () => {
  await initStatistics()
})
// 搜索
const searchCount = computed(() => {
  return searchList.value.length
})
const searchList = ref<IGetObjectChatSearchData[]>([]);


const searchQuery = ref<string>('');
// const selectedDate = ref('');
const activeTab = ref<string>('tab1');
// 跳转消息
const searchBoxRef = ref(null);
const handleSkipToMessage = async(message: IGetObjectChatSearchData) => {
  // 跳转到指定消息
  // alert(JSON.stringify(message))
  // TODO:调用两次确保滚动到指定消息
  await searchBoxRef.value?.handleSkip(message)
  await searchBoxRef.value?.handleSkip(message)
  // 可以使用滚动到指定消息的逻辑
}

const searchListRef = ref(null);
const handleSearch = async (query: string, date: Array<any>) => {
  const list = await imApi.getChatSearchApi({
    objectId: props.selectedFriend?.id!,
    computerId: String(props.node.id),
    content: query,
    size: 50,
    beginTime: date ? dayjs(date[0]).format('YYYY-MM-DD 00:00:00') : '',
    endTime: date ? dayjs(date[1]).format('YYYY-MM-DD 23:59:59') : '',
  });
  searchList.value = list;
  return list;
}
const hasSearch = ref(false);
const handleActiveTabChange = async (tab: string, content: string, date: Array<any>) => {
  if (tab) {
    hasSearch.value = true;
    activeTab.value = tab;
  }
  const list = await handleSearch(content, date);
  // searchCount.value = list.length;
  await nextTick();
  // 选中第一个
  if (list.length > 0) {
    // debugger
    searchQuery.value = content;
    searchListRef.value?.selectItem(list[0])
    // await handleSkipToMessage(list[0])
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