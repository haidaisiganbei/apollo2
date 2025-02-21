<template>
  <div class="video-message">
    <video :src="message.url" controls></video>
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
.video-message {
  /* Add your styles here */
}
</style>