<!-- VideoInfo.vue -->
<script lang="ts" setup>
const props = defineProps({
  info: Object,
});
</script>

<template>
  <div class="info-container">
    <div class="info">
      <div class="name">{{ info.name }}</div>
      <div class="description">{{ info.description }}</div>
      <div class="stars">
        <span v-for="(star, index) in 5" :key="index" class="star">
          <span v-if="index < info.score" class="filled-star">★</span>
          <span v-else class="empty-star">☆</span>
        </span>
      </div>
    </div>
  </div>
</template>

