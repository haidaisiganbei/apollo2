<template>
  <div class="audio-message">
    <audio :src="message.url" controls></audio>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.audio-message {
  /* Add your styles here */
}
</style>