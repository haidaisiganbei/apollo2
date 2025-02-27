<template>
  <div class="mini-message" @click="handleClick">
    <div class="title">
      <!-- <span class="avatar"></span> -->
      <span class="text">
        {{ content?.title }}
      </span>
    </div>
    <div class="body">
      {{ content?.description }}
    </div>
    <div class="footer">
      <div class="footer-text">{{ content?.bottomText }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  record: IRecord;
  friend: IFriendItem;
}>()

const content = computed(() => {
  try {
    const content = JSON.parse(props.record.content)
    return content
  } catch (error) {
    return props.record.content
  }
})
const handleClick = () => {
  if (!content.value.url) return
  window.open(content.value.url) 
}

</script>
<style lang='scss' scoped>
.mini-message {
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  cursor: pointer;

  .title {
    display: inline-flex;
    align-items: center;

    .avatar {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #ccc;
      margin-right: 10px;
    }

    .text {
      flex: 1;
      font-size: 14px;
      // 不换行
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .body {
    flex: 1;
  }

  .footer {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    border-top: 1px solid #e5e5e5;
    height: 20px;
  }
}
</style>