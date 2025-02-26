<template>
  <div class="file-message">
    <div class="file-info">
      <div class="file-name">{{ content?.title }}</div>
      <div class="file-size">{{ formatFileSize(content?.attachment?.size??0) }}</div>
    </div>
    <el-icon v-if="!content?.status && !isDownloading" class="file-icon">
      <Download @click="handleDownload" />
    </el-icon>
    <el-icon v-if="content?.status === 1 && isDownloading" class="file-icon">
      <Loading />
    </el-icon>
    <el-icon v-if="content?.status === 2" class="file-icon">
      <Download @click="handleDownload" />
    </el-icon>
    <el-icon v-if="content?.status === 3" class="file-icon" @click="handlePreview">
      <Files />
    </el-icon>
  </div>
  <div class="error">{{ content?.errMsg }}</div>
</template>

<script setup lang="ts">
import { imApi } from '@/api';
import { formatFileSize, getUrl } from '@/utils/util'
import { Files, Download, Loading } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import qs from 'qs'
const props = defineProps<{
  record: IRecord;
}>()

const content = ref()
const isDownloadSuccess = computed(() => content?.value?.status === 3);
// const content = computed(() => {
//   try {
//     const content = JSON.parse(props.record.content)
//     return content
//   } catch (error) {
//     return props.record.content
//   }
// })
const imageUrl = ref('');

onMounted(() => {
  try {
    content.value = JSON.parse(props.record.content);
  } catch (error) {
    content.value = {
      "attachment": {
        "size": 0
      },
      "bottomText": "",
      "description": "",
      "errMsg": "",
      "status": null,
      "title": ""
    };
  }
  if (content.value.status === 3) {
    const params = {
      id: props.record.id,
      computerId: props.record.computerId,
    }
    imageUrl.value = getUrl(params);
  }
  // errorMsg.value = content.value.errMsg;
})
const fileIcon = computed(() => {
  const fileType = content.value.fileType || 'unknown'
  return `/assets/file-icons/${fileType}.png`
})

const handleDownload = async () => {
  console.log(props.record);
  const res = await imApi.downloadMessageFileApi({
    id: props.record.id,
    computerId: props.record.computerId,
  })
  pollMessageStatus()
}
const isDownloading = ref(false);
const pollMessageStatus = () => {
  const intervalId = setInterval(async () => {
    console.log('轮询消息状态');
    try {
      const res = await imApi.getChatRecordApi({
        size: 1,
        current: 1,
        computerId: props.record.computerId,
        id: props.record.id,
      });
      const newContent = JSON.parse(res.content);
      if (newContent.status === 2) {
        clearInterval(intervalId);
        isDownloading.value = false;
        content.value = newContent;
        ElMessage.error(newContent.errMsg);
      }
      if (newContent.status === 3) {
        clearInterval(intervalId);
        isDownloading.value = false;
      }
    } catch (error) {
      clearInterval(intervalId);
      isDownloading.value = false;
      console.error('获取消息状态失败', error);
    }
  }, 3000); // Poll every 3 seconds
};
const handlePreview = async () => {
  console.log('预览');

  try {
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
  display: inline-flex;
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
.error {
  color: red;
  margin-top: 10px;
  font-size: 12px;
}
</style>