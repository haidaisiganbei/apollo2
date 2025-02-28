<template>
  <div class="link-message" @click="openLink">
    <div class="title">{{ content.title }}</div>
    <div class="description">{{ content.description }}</div>
    <div class="footer">{{ content.bottomText }}</div>
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
  width: 240px;
  text-align: left;
  height: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

}

.link-message:hover {
  background-color: #e0e0e0;
}

.link-message .title {
  margin: 0;
  font-size: 14px;
  color: #333;
  /* 不换行 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-message .description {
  margin: 5px 0;
  font-size: 12px;
  color: #666;
  /* 最多两行 */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* 这里是超出几行省略 */
  overflow: hidden;
  flex: 1;
}

.link-message .footer {
  font-size: 12px;
  color: #999;
  border-top: 1px solid #dcdfe6;
  height: 20px;
}
</style>