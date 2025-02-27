<template>
  <div class="chat-container">
    <div ref="messageContainer" class="messages">
      <template v-if="messages">
        <div v-for="message in messages?.records" :key="message.id" :class="['message', message.selfFlag ? 'self' : 'other', { 'highlighted': message.id === highlightedMessageId, 'middle': message.msgType == 66 },
        ]" :ref="setMessageRefs">
          <div :class="['message-header', message.selfFlag ? 'self-header' : 'other-header']">
            <span class="username">{{ message.name }}</span>
            <span class="time">{{ message.createTime }}</span>
          </div>
          <div class="message-content">
            <img v-if="message.selfFlag" :src="rebot" class="rebot">
            <Message :record="message" :friend="friend" />
            <img v-if="!message.selfFlag" :src="rebot" class="rebot">
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
import rebot from '@/assets/rebot.png'
interface IProps {
  friend: IFriendItem;
  node: IComputerTreeNode;
  initSize?: number;
  msgType?: Array<any>;
}

interface IGetObjectChatSearchData {
  content: string;
  createTime: string;
  current: number;
  pagePosition: number;
}

const props = withDefaults(defineProps<IProps>(), {
  msgType: () => []
});
// 消息
const messages = ref<IChatDataResponse>();
const page = reactive({
  current: 1,
  size: props.initSize ?? 50,
})
const messageRefs = ref<HTMLElement[]>([]);
const highlightedMessageId = ref<string | null>(null);

const initMessages = async () => {
  try {
    messageRefs.value = [];
    if (!props.friend?.id) return;
    messages.value = await imApi.getMessageList({
      objectId: props.friend?.id,
      ...page,
      computerId: String(props.node.id),
      msgTypeList: props.msgType
    })
    scrollToTop();
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

const setMessageRefs = (el: any) => {
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
const handleSkip = async (message: IGetObjectChatSearchData) => {
  // // 跳转到指定消息
  // messages.value = undefined;
  await nextTick();
  if (page.current != message.current) {
    page.current = message.current;
    messages.value = await imApi.getMessageList({
      objectId: props.friend?.id,
      ...page,
      computerId: String(props.node.id),
    })
    await nextTick();
  }
  console.log('messageRefs', messageRefs.value);

  const targetMessage = messageRefs.value[message.pagePosition - 1];
  console.log(targetMessage);
  if (targetMessage) {
    highlightedMessageId.value = String(messages.value?.records[message.pagePosition - 1]?.id) || null;
    console.log(highlightedMessageId.value);
    targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    messageRefs.value = [];
  }
}

defineExpose({
  handleSkip
})
</script>

<style scoped lang="scss">
.chat-container {
  height: calc(100vh - 270px);
  min-width: 800px;
  max-width: 1200px;
  width: 100%;
  overflow-y: hidden;
  margin: 0 auto;
  border: 1px solid #ccc;
  background-color: #F5F5F5;
}

.messages {
  // flex: 1;
  // height: calc(100% - 200px);
  height: calc(100vh - 370px);
  padding: 10px;
  overflow-y: auto;
  // 隐藏滚动条
  scrollbar-width: none;
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
  display: inline-flex;
  max-width: 70%;
  overflow: auto;
  /* 消息显示不下就换行 */
  word-wrap: break-word;
  gap: 10px;
}

.rebot {
  display: inline-block;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.middle {
  .message-header.other-header {

    justify-content: center !important;
  }

  .message-content {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
  .rebot {
    display: none;
  }
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