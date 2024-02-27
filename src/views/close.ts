import { show, activeIds } from './SearchView.vue';

export const close = (tag: any) => {
show.value = false;
activeIds.value.splice(activeIds.value.indexOf(tag), 1);
};
