<script setup>
  import IframeResizer from '@iframe-resizer/vue/sfc'
  import '@iframe-resizer/child'
</script>

<template>
  <IframeResizer
    license="GPLv3"
    src="https://profound-florentine-1fdd7c.netlify.app/"
    class="iframe"
  />
</template>

<style scoped>
  .iframe {
    width: 100%;
    height: 100vh;
    overflow: visible;
  }
</style>