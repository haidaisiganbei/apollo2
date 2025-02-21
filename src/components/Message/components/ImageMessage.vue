<template>
  <div class="image-message">
    <img :src="message.url" alt="image" />
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
.image-message img {
  max-width: 100%;
}
</style>