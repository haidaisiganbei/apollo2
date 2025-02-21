<template>
  <div class="text-message">
    {{ message.content }}
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
.text-message {
  /* Add your styles here */
}
</style>