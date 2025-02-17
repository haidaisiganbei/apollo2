<template>
  <div>
    <el-input v-if="isEditing" v-model="inputValue" @blur="toggleEdit" />
    <span v-else @click="toggleEdit">{{ inputValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,defineEmits } from "vue";

 const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isEditing = ref(false);
const inputValue = ref(props.modelValue);

const toggleEdit = () => {
  if (isEditing.value) {
    emit("update:modelValue", inputValue.value);
  }
  isEditing.value = !isEditing.value;
};

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});
</script>

<style scoped>
span {
  cursor: pointer;
  border-bottom: 1px dashed #409eff;
}

.el-input {
  width: 200px;
}
</style>