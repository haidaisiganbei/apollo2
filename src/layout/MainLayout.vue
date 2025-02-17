<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>
<style scoped>
.layout-container {
  ::v-deep(.el-header) {
    padding: 0;
  }

  ::v-deep(.el-main) {
    height: calc(100vh - 60px);
  }
}
</style>