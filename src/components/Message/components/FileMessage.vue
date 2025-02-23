<template>
  <div class="file-message">
    <div class="file-info">
      <div class="file-name">{{ content.title }}</div>
      <div class="file-size">{{ formatFileSize(content.attachment.size) }}</div>
    </div>
      <el-icon class="file-icon">
        <Files />
      </el-icon>
  </div>
</template>

<script setup lang="ts">
import { formatFileSize } from '@/utils/util'
import { Files } from '@element-plus/icons-vue'
const props = defineProps<{
  record: IRecord;
}>()
const content = computed(() => {
  try {
    const content = JSON.parse(props.record.content)
    return content
  } catch (error) {
    return props.record.content
  }
})

const fileIcon = computed(() => {
  const fileType = content.value.fileType || 'unknown'
  return `/assets/file-icons/${fileType}.png`
})
</script>

<style scoped>
.file-message {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  word-wrap: break-word;
  margin-bottom: 10px;
}

.file-icon {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  font-size: 32px;
}

.file-info {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: bold;
  color: #333;
}

.file-size {
  color: #999;
  font-size: 12px;
  margin-top: 12px;
}
</style>