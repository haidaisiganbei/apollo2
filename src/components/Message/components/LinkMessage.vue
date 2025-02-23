<template>
  <div class="link-message" @click="openLink">
    <h3>{{ content.title }}</h3>
    <p>{{ content.description }}</p>
    <span>{{ content.bottomText }}</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  record: IRecord;
}>();

const content = computed(() => {
  try {
    return JSON.parse(props.record.content);
  } catch (error) {
    return { title: '', description: '', bottomText: '', url: '' };
  }
});

const openLink = () => {
  if (content.value.url) {
    window.open(content.value.url, '_blank');
  }
};
</script>

<style scoped>
.link-message {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
}

.link-message:hover {
  background-color: #e0e0e0;
}

.link-message h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.link-message p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.link-message span {
  font-size: 12px;
  color: #999;
}
</style>