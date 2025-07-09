<template>
  <section class="mb-4">
    <Title>Link Settings</Title>
    <Divider />
  </section>

  <section class="mb-4">
    <LinkList />
    <Divider />
  </section>

  <section>
    <LinkForm />
  </section>
</template>

<script setup lang="ts">
import Title from '@/components/common/Title.vue';
import Divider from '@/components/common/Divider.vue';
import LinkForm from '@/components/forms/LinkForm.vue';
import LinkList from '@/components/LinkList.vue';
import { linkProvider } from '@/composables/linkProvider';

const props = defineProps({
  parentId: String,
});

linkProvider(props.parentId ?? 'test');
</script>
