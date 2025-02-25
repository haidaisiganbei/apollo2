<template>
  <div :class="['text-message']">
    {{ text }}
    <!-- <div :class="['message-bubble']">
    </div> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  record: IRecord;
}>()
const text = computed(() => {
  try {
    const content = JSON.parse(props.record.content)
    return content.text
  } catch (error) {
    return props.record.content
  }
})
</script>

<style scoped>
.text-message {
  /* display: flex;
  justify-content: center; */
  margin-bottom: 10px;
  max-width: 70%; /* Adjust this value if you want a different max width */
  padding: 10px;
  border-radius: 4px;
  word-wrap: break-word;
  background-color: #f1f1f1; /* Add a background color if needed */
  text-align: center; /* Center the text inside the bubble */
}

/* .message-bubble {
} */
</style>