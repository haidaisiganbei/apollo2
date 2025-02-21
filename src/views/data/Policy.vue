<template>
  <el-container class="policy-container">
    <el-aside>
      <el-descriptions title="目标机状态" :column="1" size="large">
        <el-descriptions-item label="备注名：">
          <EditableInput v-model="editableText" @change="handleNameChange" />
        </el-descriptions-item>
        <el-descriptions-item label="计算机名："> {{ computerInfo?.computerName }} </el-descriptions-item>
        <el-descriptions-item label="ip地址：">{{ computerInfo?.ipAddress }}</el-descriptions-item>
        <el-descriptions-item label="网卡地址：">{{ computerInfo?.macAddress }}</el-descriptions-item>
        <el-descriptions-item label="CPU利用率：">{{ computerInfo?.cpuUsage }}</el-descriptions-item>
        <el-descriptions-item label="内存利用率：">{{ computerInfo?.memoryUsage }}</el-descriptions-item>
        <el-descriptions-item label="磁盘利用率：">{{ computerInfo?.diskUsage }}</el-descriptions-item>
        <el-descriptions-item label="联网情况：">{{ computerInfo?.status }}</el-descriptions-item>
      </el-descriptions>

      <div class="uninstall-btn">
        <el-button type="primary" class="uninstall-btn" @click="handleUninstall">客户端卸载</el-button>
      </div>
    </el-aside>
    <el-main>
      <div class="main-content">
        <div class="title">策略配置</div>
        <el-form>
          <el-form-item label="所有功能">
            <el-switch v-model="isAllFunction" @change="handleAllFunctionChange" />
          </el-form-item>
          <el-divider />
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { computerApi } from '@/api'
import EditableInput from '@/components/EditableInput.vue';
import { ElMessage } from 'element-plus';
const props = defineProps({
  node: {
    type: Object,
    default: () => { }
  },
})

const emit = defineEmits(['updatetree'])
const computerInfo = ref<IComputerInfo>()
const editableText = ref('')
const refreshComputerInfo = async () => {
  const res = await computerApi.getComputerInfoApi({
    id: props.node.id
  })
  computerInfo.value = res
  editableText.value = res.remarkName
  isAllFunction.value = res.policyFlag
}
onMounted(async () => {
  console.log('policy mounted', props.node)
  refreshComputerInfo()
})
watch(() => props.node, async () => {
  console.log('watch node', props.node)
  await refreshComputerInfo()
})
// 所有功能
const isAllFunction = ref(false)
// 名称修改
const handleNameChange = async (val: string) => {
  await computerApi.editComputerInfoApi({
    id: props.node.id,
    remarkName: val,
    groupId: props.node.parentId
  })
  ElMessage.success('修改成功')
  // 触发事件
  emit('updatetree', val)

}
// 卸载客户端
const handleUninstall = async () => {
  await computerApi.uninstallComputerInfoApi({
    id: props.node.id
  })
  ElMessage.success('卸载成功')
  // 刷新节点
  emit('updatetree')
}
// 所有功能开关
const handleAllFunctionChange = async (val: boolean) => {
  await computerApi.editPolicyFlagApi({
    id: props.node.id,
    enabled: val
  })
  ElMessage.success('修改成功')
  // 触发事件
  emit('updatetree')
}
</script>
<style lang='scss' scoped>
.policy-container {
  height: 100%;

  .el-aside {
    width: 300px;
    height: 100%;
    border-right: 1px solid #eee;
  }

  .el-main {
    height: 100%;
    padding: 0;

    .main-content {
      padding: 0 16px;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>