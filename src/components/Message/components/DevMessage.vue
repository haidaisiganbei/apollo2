<template>
  <div :class="['text-message', { 'self': props.record.selfFlag, 'other': !props.record.selfFlag }]">
    <div :class="['message-bubble', { 'self-bubble': props.record.selfFlag, 'other-bubble': !props.record.selfFlag }]">
      {{ title }}
      <span :class="['arrow', { 'self-arrow': props.record.selfFlag, 'other-arrow': !props.record.selfFlag }]"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  record: IRecord;
}>()
const title = computed(() => {
  try {
    const content = JSON.parse(props.record.content)
    return content.title
  } catch (error) {
    return props.record.content
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
</style>