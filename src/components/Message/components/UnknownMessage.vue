<template>
  <div class="unknown-message">
    <span>未知消息类型</span>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.unknown-message {
  color: red;
}
</style>