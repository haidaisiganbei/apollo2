<template>
  <div class="location-message">
    <h3>位置信息</h3>
    <p>地址：{{ content.address }}</p>
    <p>海拔高度：{{ content.elevation }}</p>
    <p>纬度：{{ content.latitude }}</p>
    <p>地点名称：{{ content.locationName }}</p>
    <p>经度：{{ content.longitude }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  record: IRecord;
}>();

const content = computed(() => {
  try {
    return JSON.parse(props.record.content);
  } catch (error) {
    return { address: '', elevation: '', latitude: '', locationName: '', longitude: '' };
  }
});
</script>

<style scoped lang="scss">
.location-message {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  text-align: left;
  h3 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
  }
}
</style>