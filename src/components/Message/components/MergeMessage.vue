<template>
  <div class="chat-record">
    <!-- 合并聊天记录消息 -->
    <div class="chat-record-title">{{ content?.value?.title }}</div>
    <div class="chat-record-description">
      <div v-for="(message, index) in messages" :key="index" :class="getMessageClass(message)">
        {{ message }}
      </div>
    </div>
    <div class="chat-record-footer">聊天记录</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  record: IRecord;
}>()
const content = computed(() => {
  try {
    const content = JSON.parse(props.record.content)
    return content
  } catch (error) {
    return props.record.content
  }
})

const messages = computed(() => {
  return content.value.description.split('\r\n').filter(msg => msg.trim() !== '')
})

const getMessageClass = (message: string) => {
  return message.includes('[图片]') ? 'chat-message image-message' : 'chat-message'
}
</script>


<style scoped lang="scss">
.chat-record {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  // margin-bottom: 12px;
  text-align: left;
  
  .chat-record-title {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 16px;
  }
  
  .chat-record-description {
    white-space: pre-wrap;
    font-size: 14px;
    .chat-message {
      margin-bottom: 4px;
      
      &.image-message {
        color: #e5e5e5;
      }
    }
  }
  .chat-record-footer{
    padding-top: 4px;
    font-size: 12px;
    color: #888;
    margin-top: 8px;
    border-top: 1px solid #e5e5e5;
  }
}
</style>