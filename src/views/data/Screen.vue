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
          <el-option label="画质优先（1080）" :value="0"></el-option>
          <el-option label="性能优先（360）" :value="1"></el-option>
          <el-option label="智能推荐" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    
    <div class="desktop">
      <div v-if="isLoading&&!currentImage" class="loading">加载中...</div>
      <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
      <img 
        v-else
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
const selectedQuality = ref(0);
const currentImage = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const requestId = ref(0);
const refreshInterval = ref(0); // 刷新间隔标识符

// 防抖处理（300ms）
const fetchImageDebounced = debounce(fetchImage, 300);

async function fetchImage(quality: number, isManual = false) {
  const currentRequestId = ++requestId.value;
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await computerApi.getComputerDesktopImgApi({
      quality,
      id: props.node.id,
      timestamp: new Date().getTime() // 防止缓存
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
  // 根据画质设置不同的刷新频率（单位：毫秒）
  const intervals = {
    0: 5000,  // 高清模式5秒刷新
    1: 3000,  // 性能模式3秒刷新
    2: 4000   // 智能模式4秒刷新
  };
  
  refreshInterval.value = window.setInterval(() => {
    fetchImage(selectedQuality.value);
  }, intervals[selectedQuality.value]);
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