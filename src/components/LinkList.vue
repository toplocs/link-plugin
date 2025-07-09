<template>
  <div class="max-h-[200px] overflow-y-auto">
    <LinkListItem
      v-for="link of links"
      :link="link"
      :key="link.id"
    />
  </div>
</template>

<script setup lang="ts">
import LinkListItem from '@/components/LinkListItem.vue';
import { useLinks } from '@/composables/linkProvider';

const { links } = useLinks();
</script>