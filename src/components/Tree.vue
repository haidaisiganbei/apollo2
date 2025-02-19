<template>
  <div class="tree-container">
    <!-- 搜索框 -->
    <div class="operation-bar">
      <el-input v-model="filterText" placeholder="输入关键字过滤" clearable style="margin-bottom: 15px" />
      <el-select style="width: 160px;" v-model="status" @change="handleStatusChange">
        <el-option label="全部" :value="0"></el-option>
        <el-option label="在线" :value="1"></el-option>
        <el-option label="离线" :value="2"></el-option>
        <el-option label="升级中" :value="3"></el-option>
      </el-select>
    </div>

    <!-- 树形结构 -->
    <el-tree ref="treeRef" :data="treeData" node-key="id" :props="defaultProps" default-expand-all draggable
      :allow-drag="allowDrag" :allow-drop="allowDrop" :filter-node-method="filterNode" :expand-on-click-node="false"
      @node-contextmenu="handleContextMenu" @node-click="handleNodeClick"
      @node-drag-end="handleDragEnd"
      >
      <template #default="{ node, data }">
        <div class="custom-node" :title="data.name" @dblclick="handleNodeDblclick(node, data)">
          
          <span>
            <el-icon v-if="data.groupFlag"><Folder /></el-icon>
            <el-icon v-else><Monitor /></el-icon>
            {{ node.label }}{{ data.children.length ? `(${data.children.length})` : null }}</span>
          <span v-if="!isFiltering && data.groupFlag" class="node-actions">
            <el-button v-if="data.id == 1" title="新增" type="primary" link @click.stop="handleAddChild(data)">
              <el-icon>
                <Plus />
              </el-icon>
            </el-button>
            <el-button v-if="data.id != 1" title="删除" type="danger" link @click.stop="handleDelete(node, data)">
              <el-icon>
                <DeleteFilled />
              </el-icon>
            </el-button>
          </span>
        </div>
      </template>
    </el-tree>

    <!-- 右键菜单 -->
    <el-dialog v-model="dialogVisible" title="节点操作" width="30%">
      <el-form :model="form" @submit.prevent="confirmUpdate">
        <el-form-item label="计算机名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUpdate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Plus, DeleteFilled,Folder,Monitor } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type {
  AllowDropType,
  NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type'
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:data', 'node-added', 'node-deleted', 'node-updated', 'node-clicked',
  'node-drag-end'
])

const treeRef = ref<any>(null)
const filterText = ref('')
const dialogVisible = ref(false)
const currentParent = ref(null)
const form = ref({ name: '' })
const currentNode = ref(null)
const defaultProps = {
  children: 'children',
  label: 'name'
}

// 计算属性处理数据
const treeData = computed({
  get: () => props.data,
  set: (value) => emit('update:data', value)
})

// 判断是否正在过滤
const isFiltering = computed(() => filterText.value.length > 0)

// 过滤方法
const filterNode = (value, data) => {
  if (!value) return true
  console.log(data);
  return data.name.includes(value)
}
// 计算机状态
const status = ref(0)
// 计算机状态变化
const handleStatusChange = (val: number) => {
  status.value = val
}

// 监听过滤文本变化
watch(filterText, (newVal) => {
  treeRef.value.filter(newVal)
})

// 监听树形数据变化
watch(treeData, (newVal) => {
  treeRef.value.filter(filterText.value)
}
)

// 新增分组
const handleAddChild = (data) => {
  const newNode = {
    parentId: 0,
    name: '未命名组',
  }
  emit('node-added', newNode)
}

// 编辑分组名称
const handleNodeDblclick = (node: Node, data) => {
  if (data.id == 1) return
  if (!data.groupFlag) return
  form.value.name = node.label
  currentNode.value = node
  dialogVisible.value = true
}

// 编辑新增
const confirmUpdate = () => {
  if (!form.value.name.trim()) return
  const newNode = {
    id: currentNode.value.data.id,
    name: form.value.name.trim(),
    parentId: currentNode.value.data.parentId,
  }
  dialogVisible.value = false
  treeRef?.value?.filter(filterText.value)
  emit('node-updated', newNode)
}

// 删除分组
const handleDelete = (node: Node, data) => {
  // 二次确认
  ElMessageBox.confirm('确定删除该节点吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    emit('node-deleted', data)
  }).catch(() => {
    // 取消删除
  })
}
// 右键菜单处理
const handleContextMenu = (event, data, node, treeNode) => {
  // 这里可以添加右键菜单逻辑
  event.preventDefault()
}
// 可拖拽节点
const allowDrag = (draggingNode: Node) => {
  // 默认组不可移动
  return draggingNode.data.id != 1
}
// 可放置节点
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  // 判断拖拽节点是目录还是计算机
  if (draggingNode.data.groupFlag) {
    // 如果是目录、放置节点只能是根节点
    return dropNode.data.parentId == 0 && type !== 'inner'
  } else {
    // 如果是计算机、放置节点只能是目录和计算机节点的前后
    return dropNode.data.groupFlag && type == 'inner' || !dropNode.data.groupFlag && type !== 'inner'
  }
}

const handleDragEnd = (draggingNode: Node, dropNode: Node, dropType: AllowDropType, ev: DragEvent) => {
  emit('node-drag-end', draggingNode.data, dropNode.data, dropType)
}

// // 监听过滤文本
// watch(filterText, (val) => {
//   treeRef.value.filter(val)
// })

// 处理节点点击

const handleNodeClick = (data) => {
  console.log(data);
  emit('node-clicked', data)
}
</script>

<style scoped>
.tree-container {
  padding: 20px;
}

.custom-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.node-actions {
  opacity: 0;
  transition: opacity 0.2s;
}

.el-tree-node__content:hover .node-actions {
  opacity: 1;
}

.operation-bar {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}
</style>