<template>
  <div class="header">
    <div class="logo">
      <img :src="Logo">
      <h1>阿波罗 V1.0.1</h1>
    </div>
    <!-- 顶部菜单导航 -->
    <ul class="menu">
      <li v-for="(item, index) in menuList" :key="index">
        <router-link :to="item.path" active-class="active">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Logo from '@/assets/logo.png'

const menuList = [
  {
    name: '首页',
    path: '/home'
  },
  {
    name: '数据采集',
    path: '/data'
  },
  {
    name: 'AI分析',
    path: '/ai'
  },
  {
    name: '系统设置',
    path: '/setting'
  }
]
</script>

<style lang='scss' scoped>
.header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }

  .menu {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    li {
      display: inline-block;
      margin: 0 20px;
      cursor: pointer;
      list-style: none;
      font-size: 20px;
      color: #333;
      a {
        color: #333;
        text-decoration: none;
        &:hover {
          color: #409eff;
        }
        &.active {
          color: #409eff;
        }
      }
    }
  }
}
</style>