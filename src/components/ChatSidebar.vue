<template>
  <aside class="sidebar">
    <!-- 新增账号切换Tabs -->
    <el-tabs v-model="activeAccount" class="account-tabs">
      <el-tab-pane v-for="account in accounts" :label="account.name" :name="account.id" />
    </el-tabs>
    <div class="search">
      <el-input v-model="searchQuery" clearable placeholder="搜索/搜索联系人..." :prefix-icon="Search" />
    </div>
    <div class="friends-list">
      <el-scrollbar>
        <div v-for="(friend, index) in filteredFriends" :key="index" :class="['friend-item', { 'selected': selectedFriend?.id === friend.id }]" @click="() => selectFriend(friend)">
          <!-- <img :src="friend.avatar" class="avatar" /> -->
          <div class="friend-info">
            <span class="friend-name">{{ friend.name || friend.uniqueName || friend.externalId }}
              {{ getGroupNumber(friend) }}
            </span>
            <span class="recent-message">{{ JSON.parse(friend?.content).text }}</span>
            <span class="timestamp">{{ dayjs(friend.createTime).format(`MM月DD日`) }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </aside>
</template>

<script lang="ts" setup>
// 在searchQuery定义之前新增账号状态
import { ElInput, ElScrollbar } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { imApi } from '@/api';

const props = defineProps<{
  // recentMessages: { [key: string]: any },
  node: IComputerTreeNode
}>();
const emit = defineEmits<{ (e: 'selectFriend', friend: IFriendItem): void }>();
// 账号
const accounts = ref<IAccountListItem[]>([])
const activeAccount = ref<number>();
const imType = inject('imType');
const initAccountList = async () => {
  accounts.value = await imApi.getAccountList({
    computerId: props.node.id,
    imType
  })
  if(!activeAccount.value){
    activeAccount.value = accounts?.value[0]?.id;
  }

}
onMounted(async () => {
  await initAccountList()
})
watch(() => props.node, () => {
  initAccountList()
})
// 好友
const friends = ref<IFriendItem[]>([]);
watch(() => activeAccount.value, async () => {
  if (!activeAccount.value) return;
  friends.value = await imApi.getFriendList({
    accountId: activeAccount.value,
    computerId: String(props.node.id)
  })
  // 选中第一个好友
  selectFriend(friends.value[0]);
})
/**
 * 判断是否是群聊
 * @param friend 
 * @returns string
 */
const getGroupNumber = (friend: IFriendItem) => {
   if(friend.type===1){
    const extend = JSON.parse(friend.extend);
    return `(${extend?.groupMemberCount})`;
   }else{
    return '';
   }
}
// 搜索
const searchQuery = ref<string>('');
// 暴露刷新方法给父组件
defineExpose({
  refreshFriends: async (keyword:string) => {
    // await initAccountList();
    if (activeAccount.value) {
      friends.value = await imApi.getFriendList({
        accountId: activeAccount.value,
        content: keyword,
        computerId: String(props.node.id)
      });
      selectFriend(friends.value[0]);
      await nextTick();
    }
  }
});
const filteredFriends = computed(() => {
  return friends.value.filter(friend => friend.name.includes(searchQuery.value));
});

const selectedFriend = ref<IFriendItem | null>(null);

const selectFriend = (friend: IFriendItem) => {
  selectedFriend.value = friend;
  emit('selectFriend', friend);
};
</script>

<style scoped>
/* 新增Tabs样式 */
.account-tabs {
  padding: 8px 10px 0;
}

.account-tabs :deep(.el-tabs__header) {
  margin: 0;
}

.account-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.sidebar {
  width: 300px;
  height: 100%;
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
  height: 48px;
}

.friend-item:hover {
  background-color: #f9f9f9;
}

.friend-item.selected {
  background-color: #e6f7ff;
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
  width: calc(100% - 70px);
  /* 只能一行 */
  white-space: nowrap;
  /* 文本多余省略 */
  overflow: hidden;
  text-overflow: ellipsis
}

.recent-message {
  color: gray;
  font-size: 12px;
  /* width: 100px; */
  /* 只能一行 */
  white-space: nowrap;
  /* 文本多余省略 */
  overflow: hidden;
  text-overflow: ellipsis
}

.timestamp {
  position: absolute;
  right: 10px;
  top: 0px;
  color: gray;
  font-size: 10px;
}
</style>