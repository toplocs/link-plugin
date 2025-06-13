<template>
  <form
    ref="form"
    @submit.prevent="onSubmit"
    class="space-y-2"
  >
  <Title>
    Add a link
  </Title>

  <Callout v-if="errorMessage" color="red">
    {{ errorMessage }}
  </Callout>

    <TextInput
      name="href"
      placeholder="Write your link here ..."
    />

    <TextInput
      name="title"
      placeholder="Give it a title (optional)"
    />

    <SubmitButton className="w-full mt-4">
      Submit
    </SubmitButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Title from '@/components/common/Title.vue';
import TextInput from '@/components/common/TextInput.vue';
import SubmitButton from '@/components/common/SubmitButton.vue';
import Callout from '@/components/common/Callout.vue';
import { useLinks } from '@/composables/linkProvider';

const emit = defineEmits(['submit']);
const { links, createLink } = useLinks();
const form = ref<HTMLFormElement | null>(null);
const errorMessage = ref('');

const onSubmit = async () => {
  try {
    if (errorMessage.value.length) return;
    const formData = new FormData(form.value ?? undefined);
    const node = await createLink(formData);
    form.value?.reset();
    emit('submit');
  } catch (error) {
    console.error(error);
    errorMessage.value = error.response.data;
  }
}
</script>
