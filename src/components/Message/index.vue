<template>
  <div>
    <component :is="componentName" :record="record" />
  </div>
</template>

<script lang="ts" setup>
import messsageProvider from './messsageProvider';
const props = defineProps<{
  record: IRecord;
}>()
const componentName = messsageProvider.getMessageTypeComponent(String(props.record.msgType))
</script>

<style scoped></style>