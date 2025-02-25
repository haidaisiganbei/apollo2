<template>
    <component :is="componentName" :record="record" :friend="friend"/>
</template>

<script lang="ts" setup>
import messsageProvider from './messsageProvider';
const props = defineProps<{
  record: IRecord;
  friend:IFriendItem
}>()
const componentName = messsageProvider.getMessageTypeComponent(String(props.record.msgType))
</script>

<style scoped></style>