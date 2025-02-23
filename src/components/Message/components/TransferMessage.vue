<template>
  <div class="transfer-message">
    <div class="transfer-header">
      <div class="transfer-status">{{ dealStatusText }}</div>
      <div class="transfer-amount">¥{{ content?.amount }}</div>
    </div>
    <!-- <div class="transfer-body">
      <p class="transfer-description">{{ content?.description }}</p>
    </div> -->
    <div class="transfer-footer">
      <span class="transfer-bottom-text">{{ content?.bottomText }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

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

const dealStatusText = computed(() => {
  if (!content) return '未知';
  const statusMap: { [key: number]: string } = {
    0: '未知',
    1: '待接收',
    2: '已被接收',
    3: '已收款',
    4: '已被退还',
    5: '已退还',
    6: '已过期',
    7: '你发起了一笔转账',
    8: '请收款',
    9: '已发起',
    10: '未收齐',
    11: '已收齐'
  };
  console.log(content);
  
  return statusMap[content.value.dealStatus] || '未知';
});
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.transfer-message {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  width: 260px;
  background-color: #f6f6f6;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  text-align: left;
  color: #fff;
}

.transfer-header {
  background-color: #FA9C3E;
  height: 64px;
  padding: 8px 16px;
  box-sizing: border-box;
}

.transfer-amount {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.transfer-status {
  font-size: 14px;
  /* color: #888888; */
}

/* .transfer-body {
  margin-bottom: 12px;
} */

.transfer-description {
  font-size: 14px;
  color: #555555;
}

.transfer-footer {
  /* text-align: right; */
  padding: 8px 16px;
  box-sizing: border-box;
  background-color: #FFFFFF;
}

.transfer-bottom-text {
  font-size: 12px;
  color: #DADADA;
}
</style>