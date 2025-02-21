<template>
  <div class="card-message">
    <span>名片: {{ message.name }}</span>
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
.card-message {
  /* Add your styles here */
}
</style>