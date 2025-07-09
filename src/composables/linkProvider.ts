import { ref, inject, provide, onMounted, onUnmounted, type Ref } from 'vue';
import gun from '../services/gun';
import { Link } from '../services/Link';
import type { LinkData } from '../services/Link';

interface LinkProvider {
  links: Ref<LinkData[]>;
  createLink: (formData: FormData) => Promise<LinkData>;
  removeLink: (id: string) => Promise<void>;
}

export function linkProvider(instance: string) {
  const links = ref<LinkData[]>([]);
  const linkService = new Link(instance);

  const createLink = async (formData: FormData): Promise<LinkData> => {
    // Convert FormData to LinkData
    const formEntries = Object.fromEntries(formData.entries());
    const linkData: Partial<LinkData> = {
      href: formEntries.href as string,
      title: formEntries.title ? formEntries.title as string : undefined,
    };
    
    const data = await linkService.create(linkData);
    links.value.push(data);
    return data;
  }

  const removeLink = async (id: string): Promise<void> => {
    await linkService.delete(id);
    links.value = links.value.filter(x => x.id !== id);
  }

  onMounted(() => {
    console.log('Mount LinkProvider');
    gun.get(instance)
    .get('links')
    .map()
    .once((data) => {
      console.log("LinkProvider:", instance, data);
      if (data) {
        const exists = links.value.some(x => x.href === data.href);
        if (!exists) {
          links.value.push(data);
        }
      }
    });
  });

  onUnmounted(() => {
    gun.get(instance)
    .get('links')
    .map()
    .off();
  });

  provide<LinkProvider>('link', {
    links,
    createLink,
    removeLink,
  });
}

export function useLinks() {
  const data = inject<LinkProvider>('link');

  if (!data) {
    throw new Error('Composable must have an link provider.');
  }

  return data;
}