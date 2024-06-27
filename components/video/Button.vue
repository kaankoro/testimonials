<script lang="ts" setup>
const props = defineProps({
  isPlaying: Boolean,
});
</script>

<template>
      <div class="video-button">
        <div class="button-frame">
        <img v-if="!isPlaying" src="https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65f8660768719ccda419bf8b_Play-dark.svg" loading="lazy" alt="">
        <img v-else src="https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65f86607e501c6115b300a2e_Pause-dark.svg" loading="lazy" alt="">
    </div>
    </div>
</template>