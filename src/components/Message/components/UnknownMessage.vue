<template>
  <div class="unknown-message">
    <div>消息类型：{{ record.msgType }}</div>
    <span>{{ record.content }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  record: IRecord;
}>()
</script>

<style scoped>
.unknown-message {
  color: red;
}
</style>