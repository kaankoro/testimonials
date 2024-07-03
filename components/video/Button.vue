<script lang="ts" setup>
const props = defineProps({
  isPlaying: Boolean,
});
</script>

<template>
      <div class="video-button hover:bg-white/30">
        <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="white" style="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="white" style="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
    </div>
</template>