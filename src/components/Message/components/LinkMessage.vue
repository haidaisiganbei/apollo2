<template>
  <div class="link-message">
    <a :href="message.url" target="_blank">{{ message.title }}</a>
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
.link-message a {
  color: blue;
  text-decoration: underline;
}
</style>