<template>
  <div :class="['text-message', { 'self': props.record.selfFlag, 'other': !props.record.selfFlag }]">
    <div :class="['message-bubble', { 'self-bubble': props.record.selfFlag, 'other-bubble': !props.record.selfFlag }]">
      {{ text }}
      <span :class="['arrow', { 'self-arrow': props.record.selfFlag, 'other-arrow': !props.record.selfFlag }]"></span>
    </div>
  </div>
  <!-- 引用内容 -->
  <div v-if="quoteContent" class="quote-content">
    <span class="quote-name">{{ content?.quoteUser?.name }}:</span>
    <span class="quote-text">{{ quoteContent }}</span>
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
const text = computed(() => {
  try {
    const replyText = JSON.parse(content.value.replyContent)
    return replyText.text
  } catch (error) {
    return content.value
  }
})
// 引用内容
const quoteContent = computed(() => {
  try {
    const quote_content = JSON.parse(content.value.quoteContent)
    return quote_content.text
  } catch (error) {
    return content.value
  }
})
</script>

<style scoped>
.text-message {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.text-message.self {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 100%;
  padding: 10px;
  border-radius: 4px;
  word-wrap: break-word;
  position: relative;
}

.self-bubble {
  background-color: #9eea6a;
  color: #000;
}

.other-bubble {
  background-color: #9eea6a;
  color: #000;
}

.arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.self-arrow {
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #9eea6a;
  top: 10px;
  right: -10px;
}

.other-arrow {
  border-width: 10px 10px 10px 0;
  border-color: transparent #9eea6a transparent transparent;
  top: 10px;
  left: -10px;
}

.quote-content {
  margin-top: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
}
</style>