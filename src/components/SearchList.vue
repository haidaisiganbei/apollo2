<template>
  <!-- 搜索列表 -->
  <div class="search-container">
    <el-scrollbar>
      <div class='search-list'>
        <div class='search-list-item' v-for='(item, index) in props.messages' :key='index'
        @click="() => emit('select', item)"
        >
          <div class='search-list-item-content' v-html="highlightKeyword(JSON.parse(item.content).text)">
          </div>
          <div class='search-list-item-timestamp'>
            {{ item.createTime }}
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name='SearchList'>
// prop 接收的参数
const props = defineProps<{
  messages: IGetObjectChatSearchData[]
  keyword: string
}>()

// emit
const emit = defineEmits<{ (e: 'select', item: IGetObjectChatSearchData): void }>()

// Function to highlight keyword
const highlightKeyword = (text: string) => {
  if (!props.keyword) return text
  const regex = new RegExp(`(${props.keyword})`, 'gi')
  return text.replace(regex, '<span style="color:red">$1</span>')
}
</script>

<style lang='scss' scoped>
.search-container {
  // flex: 1;
  overflow: hidden;
  // height: calc(100% - 60px);
  height:600px;
}
.search-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 200px;
  overflow: auto;
}

.search-list-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  &-content {
    font-size: 14px;
    color: #333;
    // 不换行
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;


  }



  &-timestamp {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    // align-self: flex-end;
  }
}
</style>