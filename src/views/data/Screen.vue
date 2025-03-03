<template>
  <div>
    <el-form inline>
      <el-form-item label="画质">
        <el-select 
          v-model="selectedQuality" 
          placeholder="请选择" 
          style="width: 200px;"
          @change="handleQualityChange"
        >
          <el-option label="360P" :value="0"></el-option>
          <el-option label="480P" :value="1"></el-option>
          <el-option label="720P" :value="2"></el-option>
          <el-option label="1080P" :value="3"></el-option>
          <el-option label="1080PP" :value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    
    <div class="desktop">
      <img 
        v-if="currentImage"
        :src="currentImage" 
        alt="实时画面" 
        class="responsive-image"
        @error="handleImageError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, watchEffect } from 'vue';
import { computerApi } from '@/api';
import { debounce } from 'lodash-es';

const props = defineProps(['node']);
const selectedQuality = ref(3);
const currentImage = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const requestId = ref(0);
const refreshInterval = ref(0); // 刷新间隔标识符

// 防抖处理（300ms）
const fetchImageDebounced = debounce(fetchImage, 300,{ leading: true});

async function fetchImage(quality: number, isManual = false) {
  const currentRequestId = ++requestId.value;
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await computerApi.getComputerDesktopImgApi({
      quality,
      id: props.node.id,
      // timestamp: new Date().getTime() // 防止缓存
    });
    
    if (currentRequestId === requestId.value) {
      currentImage.value = response.imageData;
    }
  } catch (error) {
    if (currentRequestId === requestId.value) {
      errorMessage.value = '加载失败，请稍后重试';
    }
  } finally {
    if (currentRequestId === requestId.value) {
      isLoading.value = false;
    }
  }
}

function handleQualityChange() {
  restartRefreshInterval();
  fetchImageDebounced(selectedQuality.value, true);
}

function handleImageError() {
  errorMessage.value = '图片加载失败';
}

// 定时刷新逻辑
function startRefreshInterval() {
 const time = import.meta.env.PROD ? 500 : 5000;
  
  refreshInterval.value = window.setInterval(() => {
    fetchImage(selectedQuality.value);
  }, time);
}

function restartRefreshInterval() {
  clearInterval(refreshInterval.value);
  startRefreshInterval();
}

// 初始加载
onMounted(() => {
  fetchImage(selectedQuality.value);
  startRefreshInterval();
});

// 生命周期管理
onUnmounted(() => {
  clearInterval(refreshInterval.value);
  if (currentImage.value) {
    URL.revokeObjectURL(currentImage.value);
  }
});
</script>

<style lang="scss" scoped>
.desktop {
  position: relative;
  min-height: 300px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  overflow: hidden;
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.responsive-image {
  width: 100%;
  height: auto;
  display: block;
}

.loading, .error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
}

.error {
  color: #f56c6c;
}
</style>