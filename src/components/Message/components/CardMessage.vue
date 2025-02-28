<template>
  <div class="card-message">
    <div class="card-header">
      <div class="user-avatar">
      </div>
      <div class="user-info">
        <p class="user-name">{{ content.user.name }}</p>
      </div>
    </div>
    <div class="card-footer">
      <span>{{ content.bottomText||'个人名片' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Avatar as AvatarIcon } from '@element-plus/icons-vue';

const props = defineProps<{
  record: IRecord;
}>();

const content = computed(() => {
  try {
    return JSON.parse(props.record.content);
  } catch (error) {
    return {
      area: '',
      bottomText: '',
      user: {
        name: '',
        alias: ''
      }
    };
  }
});
</script>

<style scoped lang="scss">
.card-message {
  width: 240px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .user-avatar {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: #f5f5f5;
      display: flex;
    }

    .user-info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .user-name {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        text-align: left;
        // 不换行
        white-space: nowrap;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .card-footer {
    text-align: left;
    font-size: 12px;
    // color: #409EFF;
    padding-top: 4px;
    height: 20px;
    line-height: 20px;
    color: #606266;
    border-top: 1px solid #dcdfe6;
  }
}
</style>