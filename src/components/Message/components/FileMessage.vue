<template>
  <div class="file-message">
    <div class="file-info">
      <div class="file-name">{{ content.title }}</div>
      <div class="file-size">{{ formatFileSize(content.attachment.size) }}</div>
    </div>
    <el-icon v-if="!content.status" class="file-icon">
      <Download @click="handleDownload" />
    </el-icon>
    <el-icon v-if="content.status === 1" class="file-icon">
      <Loading @click="handleDownload" />
    </el-icon>
    <!-- <el-icon v-if="content.status === 2" class="file-icon">
      <Files  @click="handleDownload" />
    </el-icon> -->
    <el-icon v-if="content.status === 3" class="file-icon" @click="handlePreview">
      <Files />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { imApi } from '@/api';
import { formatFileSize } from '@/utils/util'
import { Files, Download, Loading } from '@element-plus/icons-vue'
import qs from 'qs'
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

const handleDownload = async () => {
  const res = await imApi.downloadMessageFileApi({
    id: props.record.id,
    computerId: props.record.computerId,
  })
}
const handlePreview = async () => {
  console.log('预览');

  try {

    // const res = await imApi.getMessageFileApi({
    // })
    const params = {
      id: props.record.id,
      computerId: props.record.computerId,
    }
    window.open(`${import.meta.env.VITE_APP_BASE_API}/cluster-apollo/apollo/im/getChatAttachment?${qs.stringify(params)}`)
  } catch (error) {

    console.log(error);
  }

}

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
  cursor: pointer;
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