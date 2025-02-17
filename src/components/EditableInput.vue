<template>
  <div class="editable-input">
    <el-input
      v-if="isEditing"
      v-model="currentValue"
      @blur="saveValue"
      @keyup.enter="saveValue"
      class="editable-input__input"
      placeholder="请输入"
    />
    <span v-else @click="isEditing = true" class="editable-input__text">{{ currentValue || "请输入" }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElInput } from 'element-plus'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'change', value: string): void,
}>()

const isEditing = ref(false)
const currentValue = ref(props.modelValue)
watch(() => props.modelValue, (newValue) => {
  currentValue.value = newValue
})
const saveValue = () => {
  emit('update:modelValue', currentValue.value)
  emit('change', currentValue.value)
  isEditing.value = false
}
</script>

<style scoped>
.editable-input {
  
  display: inline-flex;
  align-items: center;
}

.editable-input__input {
  width: 100%;
}

.editable-input__text {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid transparent;
  min-height: 14px;
  min-width: 20px;
}

.editable-input__text:hover {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>