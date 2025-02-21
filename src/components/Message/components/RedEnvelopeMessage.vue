<template>
  <div class="red-envelope-message">
    <span>红包: {{ message.amount }} 元</span>
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
.red-envelope-message {
  /* Add your styles here */
}
</style>