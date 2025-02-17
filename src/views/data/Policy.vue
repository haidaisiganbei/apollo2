<template>
  <el-container class="policy-container">
    <el-aside>
      <el-descriptions title="目标机状态" :column="1" size="large">
        <el-descriptions-item label="备注名：">
          <EditableInput v-model="computerInfo?.remarkName" />
        </el-descriptions-item>
        <el-descriptions-item label="计算机名："> {{ computerInfo?.computerName }} </el-descriptions-item>
        <el-descriptions-item label="ip地址：">{{ computerInfo?.ipAddress }}</el-descriptions-item>
        <el-descriptions-item label="网卡地址：">{{ computerInfo?.macAddress }}</el-descriptions-item>
        <el-descriptions-item label="CPU利用率：">{{ computerInfo?.cpuUsage }}</el-descriptions-item>
        <el-descriptions-item label="内存利用率：">{{ computerInfo?.memoryUsage }}</el-descriptions-item>
        <el-descriptions-item label="磁盘利用率：">{{ computerInfo?.diskUsage }}</el-descriptions-item>
        <el-descriptions-item label="联网情况：">{{ computerInfo?.status }}</el-descriptions-item>
      </el-descriptions>
    </el-aside>
    <el-main>

    </el-main>
  </el-container>
</template>
<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { computerApi } from '@/api'
import type { IComputerInfo, IComputerResponse } from '@/types/computer';
import EditableInput from '@/components/EditableInput.vue';
const props = defineProps({
  node: {
    type: Object,
    default: () => { }
  },
})

const computerInfo = ref<IComputerInfo>()
const refreshComputerInfo = async () => {
  const res = await computerApi.getComputerInfoApi({
    id: props.node.id
  })
  computerInfo.value = res.data
}
onMounted(async () => {
  console.log('policy mounted', props.node)
  const res = await computerApi.getComputerInfoApi({
    id: props.node.id
  })
  computerInfo.value = res.data
})
watch(() => props.node, async () => {
  console.log('watch node', props.node)
  await refreshComputerInfo()
})
</script>
<style lang='scss' scoped>
.policy-container {
  height: 100%;

  .el-aside {
    width: 360px;
    height: 100%;
    border-right: 1px solid #eee;
  }

  .el-main {
    height: 100%;
    padding: 0;
  }
}
</style>