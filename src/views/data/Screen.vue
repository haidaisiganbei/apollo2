<template>
  <div>
    <el-form inline>
      <el-form-item label="画质" >
        <el-select v-model="value" placeholder="请选择" style="width: 200px;">
          <el-option label="画质优先（1080）" :value="0"></el-option>
          <el-option label="性能优先（360）" :value="1"></el-option>
          <el-option label="智能推荐" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0)
</script>
<style lang='scss' scoped></style>