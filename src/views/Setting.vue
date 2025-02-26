<template>
  <div class="container">
    <div class="sidebar">
      <el-tree :data="treeData" :default-expand-all="true" :props="defaultProps"
        @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="content">
      <div v-if="contentTitle == '导出配置'">
        <el-descriptions title="安装包" border>
          <el-descriptions-item label="服务器IP">
            <el-input style="width:220px" v-model="ipAddress"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="服务器端口"><el-input style="width:220px"></el-input></el-descriptions-item>
          <el-descriptions-item label="安装包名称"><el-input style="width:220px"></el-input></el-descriptions-item>
          <el-descriptions-item label="安装包图标"><el-input style="width:220px"></el-input></el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" style="margin-top: 10px;" @click="handleExport">导出</el-button>

      </div>
      <div v-else>
        <h1>{{ contentTitle }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessageBox, ElTree } from 'element-plus';
import { computerApi } from '@/api';

const treeData = ref([
  {
    label: '客户端管理',
    children: [
      { label: '导出配置' }
    ]
  },
  {
    label: '服务端管理V',
    children: [
      { label: '软件授权' },
      { label: 'AI模型' },
      { label: '缓存数据' }
    ]
  },
  {
    label: '更多',
    children: [
      { label: '关于' }
    ]
  }
]);

const defaultProps = {
  children: 'children',
  label: 'label'
};

const contentTitle = ref('导出配置');
const contentText = ref('');

const handleNodeClick = (node) => {
  contentTitle.value = node.label;
  contentText.value = ` ${node.label}`;
};

const ipAddress = ref('');
const handleExport = async () => {
  // 导出逻辑 
  // await computerApi.exportInstallerApi({
  //   ipAddress: ipAddress.value,
  // })
  if(!ipAddress.value){
    // 提示ip地址不能为空
    ElMessageBox.alert('IP地址不能为空', '提示', {
      confirmButtonText: '确定',
      callback: action => {
        console.log(action);
      } 
    })
    return;
  }
  window.open(`${import.meta.env.VITE_APP_BASE_API}/cluster-apollo/apollo/computer/op/exportAgent?ipAddress=${ipAddress.value}`)

}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  height: calc(100vh - 100px);
}

.sidebar {
  width: 300px;
  border-right: 1px solid #ccc;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>