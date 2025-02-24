<template>
  <div class="chat-container">
    <div ref="messageContainer" class="messages">
      <template v-if="messages">
        <div v-for="message in messages?.records" :key="message.id"
          :class="['message', message.selfFlag ? 'self' : 'other', { 'highlighted': message.id === highlightedMessageId }]" :ref="setMessageRefs">
          <div :class="['message-header', message.selfFlag ? 'self-header' : 'other-header']">
            <span class="username">{{ message.name }}</span>
            <span class="time">{{ message.createTime }}</span>
          </div>
            <div class="message-content">
              <Message :record="message" />
            </div>
        </div>
      </template>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next,sizes" :current-page="page.current" :page-size="page.size"
        :page-sizes="[50, 100, 500, 1000]" :total="messages?.total" @current-change="handlePageChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { imApi } from '@/api';
import { ref, defineProps, withDefaults, reactive, watch, nextTick } from 'vue';
import Message from './Message/index.vue';
interface IProps {
  friend: IFriendItem;
}

interface IGetObjectChatSearchData {
  content: string;
  createTime: string;
  current: number;
  pagePosition: number;
}

const props = withDefaults(defineProps<IProps>(), {});
// 消息
const messages = ref<IChatDataResponse>();
const page = reactive({
  current: 1,
  size: 2,
})
const messageRefs = ref<HTMLElement[]>([]);
const highlightedMessageId = ref<string | null>(null);

const initMessages = async () => {
  try {
    if (!props.friend?.id) return;
    messages.value = await imApi.getMessageList({
      objectId: props.friend?.id,
      ...page
    })
    scrollToTop();
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

const setMessageRefs = (el: HTMLElement) => {
  if (el) {
    messageRefs.value.push(el);
  }
}

watch(() => props.friend?.id, async () => {
  initMessages()
}, {
  immediate: true
})
// 分页
const handlePageChange = (pageNumb: number) => {
  page.current = pageNumb;
  console.log('Page changed to:', pageNumb);
  initMessages()
};

const handleSizeChange = (size: number) => {
  page.size = size;
  page.current = 1; // Reset to first page when page size changes
  console.log('Page size changed to:', size);
  initMessages();
};

const messageContainer = ref<HTMLElement | null>(null);

const scrollToTop = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = 0;
  }
};

// 定位消息
const handleSkip = async (message: IGetObjectChatSearchData) => {
  // 跳转到指定消息
  page.current = message.current;
  await initMessages();
  await nextTick();
  // const targetMessage = messageRefs.value.find(el => el.textContent?.includes(message.content));
  const targetMessage = messageRefs.value[message.pagePosition-1];
  // debugger
  if (targetMessage) {
    highlightedMessageId.value = messages.value?.records[message.pagePosition-1].id || null;
    targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

defineExpose({
  handleSkip
})
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 270px);
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background-color: #F5F5F5;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.message.self {
  text-align: right;
  align-self: flex-end;
  margin-left: auto;
}

.message.other {
  text-align: left;
}

.message-header {
  display: flex;
  gap: 0 4px;
  font-size: 0.8em;
  align-items: center;
  color: #999;
  margin-bottom: 10px;
}

.message-header.self-header {
  justify-content: flex-end;
}

.message-header.other-header {
  justify-content: flex-start;
}

.message-content {
  padding: 5px 10px;
  display: inline-block;
  max-width: 70%;
  overflow: auto;
  /* 消息显示不下就换行 */
  word-wrap: break-word;
}

.input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.message.highlighted {
  background-color: #ffeaa7;
}
</style>