<template>
  <Sidebar/>
</template>

<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue';
import { linkProvider } from '@/composables/linkProvider';

const props = defineProps({
  parentId: String,
});

console.log("SideBar instance: ", props.parentId);
linkProvider(props.parentId ?? 'test');
</script>
