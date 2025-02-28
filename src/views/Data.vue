<template>
  <div class="home-container">
    <!-- 左右结构、左边树、右边内容 -->
    <div class="home-left">
      <TreeComponent ref="treeRef" v-model:data="treeData" @node-added="handleNodeAdded"
        @node-updated="handleNodeUpdated" @node-deleted="handleNodeDeleted" @node-clicked="handleNodeClicked"
        @node-drag-end="handleNodeDragEnd" />
    </div>
    <div class="home-right">
      <!-- <router-view /> -->
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <template v-for="tab in tabs" :key="tab.name">
          <el-tab-pane :label="tab.label" :name="tab.name">
            <template #label>
              <el-badge :value="getCount(tab)" class="item" :offset="[10, -5]">
                <span>{{ tab.label }}</span>
              </el-badge>
            </template>
          </el-tab-pane>
        </template>
        <component v-if="currentComputer" :is="components[activeName]" :node="currentComputer"
          @updatetree="handleUpdateComputerName" />
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import TreeComponent from '@/components/Tree.vue'
import Policy from './data/Policy.vue';
import Screen from './data/Screen.vue';
import File from './data/File.vue';
import Wechat from './data/Wechat.vue';
import DingDing from './data/DingDing.vue';
import WhatsApp from './data/WhatsApp.vue';
import WechatWeb from './data/WechatWeb.vue';
import Telegram from './data/Telegram.vue';
import { ref, onMounted, shallowRef } from 'vue'
import { computerApi, monitorApi } from '@/api'
const activeName = ref('Policy')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const getCount = (tab) => {
  const maps = {
    Wechat: 'WECHAT',
    DingDing: 'DING_TALK',
    WhatsApp: 'WHATSAPP',
    Telegram: 'TELEGRAM'
  }
  return messageCounts.value[maps[tab.name]] || ''
}

const treeRef = ref(null)
const treeData = ref([])
const refreshTreeData = async () => {
  treeData.value = await computerApi.getTree({})
}
// 消息计数响应式对象
const messageCounts = ref({})
let pollInterval = null

const fetchMessageCounts = async () => {
  try {
    if (!currentComputer.value) return
    const counts = await monitorApi.getChatCounts({ id: currentComputer.value.id })
    // 假设返回数据结构 { Policy: number, Screen: number, ... }
    messageCounts.value = counts
  } catch (error) {
    console.error('获取消息数量失败:', error)
  }
}

// 初始化轮询
const initPolling = () => {

  // 设置轮询（每30秒获取一次）
  pollInterval = setInterval(fetchMessageCounts, 10000)
}

onMounted(async () => {
  refreshTreeData()
  initPolling()
})
// 组件卸载前清除定时器
onBeforeUnmount(() => {
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
})

const currentComputer = ref(null)
const handleNodeClicked = (node) => {
  console.log('节点被点击:', node)
  if (node.groupFlag) return
  activeName.value = 'Policy'
  currentComputer.value = node
  // 立即获取一次数据
  fetchMessageCounts()
}
/**
 * 策略管理
录屏录音
文件下载
微信
微信网页版
Telegram
name使用英文
 */
const tabs = [
  { label: '策略管理', name: 'Policy' },
  { label: '录屏录音', name: 'Screen' },
  // { label: '文件下载', name: 'File' },
  { label: '微信', name: 'Wechat' },
  { label: '钉钉', name: 'DingDing' },
  { label: 'WhatsApp', name: 'WhatsApp' },
  { label: 'Telegram', name: 'Telegram' }
]
const components = shallowRef({
  Policy,
  Screen,
  File,
  Wechat,
  DingDing,
  WhatsApp,
  WechatWeb,
  Telegram
})

const handleNodeAdded = async (node) => {
  console.log('新增节点:', node)
  await computerApi.saveTreeInfoApi(node)
  // await computerApi.getTree({})
  await refreshTreeData()
}

const handleNodeUpdated = async (node) => {
  console.log('更新节点:', node)
  await computerApi.editGroupNameApi(node)
  // await computerApi.getTree({})
  await refreshTreeData()
}

const handleNodeDeleted = async (node) => {
  console.log('删除节点:', node)
  await computerApi.removeTreeInfoByIdApi({ id: node.id })
  await refreshTreeData()
}

const handleUpdateComputerName = async (val) => {
  await refreshTreeData()
  // currentComputer.value = null
}

const handleNodeDragEnd = async (draggingNode, dropNode, dropType, ev) => {
  try {
    console.log('拖拽结束:', draggingNode, dropNode, dropType, ev)
    let sort = dropNode.sort
    if (dropType === 'before') {
      sort = dropNode.sort
    } else if (dropType === 'after') {
      sort = dropNode.sort + 1
    }
    // 拖拽的是文件夹
    if (draggingNode.groupFlag) {
      await computerApi.sortComputerApi([draggingNode, dropNode])
    } else {
      // 拖拽的是电脑
      // 判断是否是同一个父节点
      if (draggingNode.parentId === dropNode.parentId) {
        // 判断是否是同一个节点
        await computerApi.sortComputerApi([draggingNode, dropNode])
      } else {
        await computerApi.sortComputerApi([{
          "id": draggingNode.id,
          "parentId": dropNode.groupFlag ? dropNode.id : dropNode.parentId,
          // "name": draggingNode.name,
          "groupFlag": draggingNode.groupFlag,
          sort
        }])
      }
    }
  } catch (error) {

  }
  await refreshTreeData()
}
</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  height: 100%;

  .home-left {
    width: 300px;
    border-right: 1px solid #ccc;
  }

  .home-right {
    flex: 1;
    padding: 0 20px;

    .demo-tabs {
      ::v-deep(.el-tabs__content) {}
    }
  }
}
</style>