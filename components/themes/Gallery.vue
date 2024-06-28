<template>
  <div class="masonry columns-3 gap-4">
    <div v-for="video in displayedVideos" :key="video.id" class="masonry-item">
      <VideoPlayer :key="video.id" :video="video" />
    </div>
  </div>
  <button
    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4"
    v-if="videoCount < videos.length"
    @click="loadMore"
  >
    Load More
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { videos } from '../videoData';

const videoCount = ref(3); // Number of videos to display initially
const displayedVideos = computed(() => {
  if (videos.value) {
    return videos.value.slice(0, videoCount.value);
  } else {
    return [];
  }
});

const loadMore = () => {
  videoCount.value += 3; // Load 3 more videos
};
</script>

<style scoped>
.masonry {
  display: flex;
  flex-wrap: wrap;
}

.masonry-item {
  width: calc(33.333% - 1rem);
  margin-bottom: 1rem;
}

@media (max-width: 1024px) {
  .masonry-item {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .masonry-item {
    width: 100%;
  }
}
</style>
