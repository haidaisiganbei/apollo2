<template>
  <div class="image-message">
    <div class="image-container">
      <img v-if="isDownloadSuccess" :src="imageUrl" alt="下载的图片" />
      <div v-else class="placeholder-container">
        <!-- <PictureFilled class="placeholder-icon" /> -->
         <div>图片</div>
        <button @click="downloadImage" class="download-button">下载</button>
        <span class="image-size">{{ formatFileSize(content.image.size) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PictureFilled } from '@element-plus/icons-vue';
import { formatFileSize } from '@/utils/util';
const props = defineProps<{
  record: IRecord
}>();

const content = computed(() => {
  try {
    return JSON.parse(props.record.content);
  } catch (error) {
    return { status: null, errMsg: '', image: { size: 0 } };
  }
});

const isDownloadSuccess = computed(() => content.value.status === 3);

const imageUrl = ref('');

const downloadImage = async () => {
  try {
    // 这里调用你的接口获取图片URL，假设接口返回的URL为response.data.url
    const response = await fetch(`/api/download-image/${props.record.id}`);
    const data = await response.json();
    imageUrl.value = data.url;
  } catch (error) {
    console.error('下载图片失败', error);
  }
};
</script>

<style scoped>
.image-message {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
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
  height: auto; /* 可以根据需要调整高度 */
  position: relative;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder-container {
  display: flex;
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

.image-size {
  margin-top: 5px;
  font-size: 14px;
  color: #606266;
}
</style>