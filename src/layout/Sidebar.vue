<template>
  <el-menu
    router
    default-active="/home"
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="/home">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    
    <el-sub-menu index="1">
      <template #title>
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user/list">用户列表</el-menu-item>
      <el-menu-item index="/user/create">创建用户</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { House, User } from '@element-plus/icons-vue'
</script>