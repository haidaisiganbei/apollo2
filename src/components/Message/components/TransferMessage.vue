<template>
  <div class="transfer-message">
    <span>转账: {{ message.amount }} 元</span>
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
.transfer-message {
  /* Add your styles here */
}
</style>