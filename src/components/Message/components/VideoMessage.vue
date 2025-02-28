<template>
  <div class="image-message">
    <div class="image-container">
      <video style="width: 240px;height: auto;" v-if="isDownloadSuccess" :src="imageUrl" controls />
      <div v-else class="placeholder-container">
        <!-- <PictureFilled class="placeholder-icon" /> -->
        <div>视频</div>
        <button v-if="!isDownloading" @click="downloadImage" class="download-button">下载</button>
        <div v-else class="downloading">
          <LoadingIcon class="loading-icon" />
          正在下载...
        </div>
        <span class="image-size">{{ formatFileSize(content?.image?.size ?? 0) }}</span>
      </div>
    </div>
    <div class="error">{{ content?.errMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PictureFilled, Loading } from '@element-plus/icons-vue';
import { formatFileSize, getUrl } from '@/utils/util';
import { imApi } from '@/api';
import { ElMessage, ElMessageBox } from 'element-plus';
const props = defineProps<{
  record: IRecord,
  friend: IFriendItem,
}>();

const content = ref()
// const content = computed(() => {
//   try {
//     return JSON.parse(props.record.content);
//   } catch (error) {
//     return { status: null, errMsg: '', image: { size: 0 } };
//   }
// });

const isDownloadSuccess = computed(() => content?.value?.status === 3);

const imageUrl = ref('');
// const errorMsg = ref('');
onMounted(() => {
  try {
    content.value = JSON.parse(props.record.content);
  } catch (error) {
    content.value = { status: null, errMsg: '', image: { size: 0 } };
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
const isDownloading = ref(false);

const downloadImage = async () => {
  isDownloading.value = true;
  try {
    const res = await imApi.downloadMessageFileApi({
      id: props.record.id,
      computerId: props.record.computerId,
    });
    // Start polling the message status
    pollMessageStatus();
  } catch (error) {
    isDownloading.value = false;
  }
};

const pollMessageStatus = () => {
  const intervalId = setInterval(async () => {
    console.log('轮询消息状态', props.record);
    try {
      const res = await imApi.getChatRecordApi({
        size: 1,
        current: 1,
        computerId: props.record.computerId,
        id: props.record.id,
      });
      const newContent = JSON.parse(res.content);
      // statues 2 失败
      if (newContent.status === 2) {
        clearInterval(intervalId);
        isDownloading.value = false;
        // console.error('下载图片失败', newContent.errMsg); 
        // errorMsg.value = newContent.errMsg;
        content.value = newContent;
        ElMessage.error(newContent.errMsg);
      }
      if (newContent.status === 3) {
        clearInterval(intervalId);
        // content.value = newContent;
        content.value = newContent;

        const params = {
          id: props.record.id,
          computerId: props.record.computerId,
        }
        imageUrl.value = getUrl(params);
        isDownloading.value = false;
      }
    } catch (error) {
      clearInterval(intervalId);
      isDownloading.value = false;
      console.error('获取消息状态失败', error);
    }
  }, 3000); // Poll every 3 seconds
};
</script>

<style scoped>
.image-message {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 240px;
}

.image-container {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: auto;
  /* 可以根据需要调整高度 */
  position: relative;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
}

.placeholder-icon {
  font-size: 48px;
  color: #c0c4cc;
}

.download-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-button:hover {
  background-color: #66b1ff;
}

.downloading {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.loading-icon {
  font-size: 24px;
  margin-right: 5px;
  animation: spin 1s linear infinite;
  color: #409EFF;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.image-size {
  margin-top: 5px;
  font-size: 14px;
  color: #606266;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 12px;
}
</style>