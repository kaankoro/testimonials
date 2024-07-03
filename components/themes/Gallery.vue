
<!-- Masonry grid oluşturmak için {{ 3 }} tane div elemanını alt alta dizip bunları yan yana koydum
reactive olması içinde window un boyutunu takip edip sayfa küçüldüğünde bu eleman sayılarını ikiye sonrada
bire düşürüyorum. Load more dendiği zaman bu {{ 3 }} yeni yüklenecek eleman bu divler arasında kendisini dağıtıyor -->
<template>
  <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
    <div class="grid gap-4 content-baseline">
      <TransitionGroup name="bounce">

      <template v-for="(video, videoIndex) in videoGroups" :key="video.id">
        <div v-if="videoIndex % columnCount === 0">
          <VideoPlayer :key="video.id" :video="video" class="w-full break-inside-avoid grid margin-4"/>
        </div>
      </template>
    </TransitionGroup>

    </div>
    <div v-if="columnCount > 1" class="grid gap-4 content-baseline">
      <TransitionGroup name="bounce">

      <template v-for="(video, videoIndex) in videoGroups" :key="video.id">
        <div v-if="videoIndex % columnCount === 1">
          <VideoPlayer :key="video.id" :video="video" class="w-full break-inside-avoid grid margin-4"/>
        </div>
      </template>
    </TransitionGroup>

    </div>
    <div v-if="columnCount > 2" class="grid gap-4 content-baseline">
      <TransitionGroup name="bounce">

      <template v-for="(video, videoIndex) in videoGroups" :key="video.id">
        <div v-if="videoIndex % columnCount === 2">
          <VideoPlayer :key="video.id" :video="video" class="w-full break-inside-avoid grid margin-4"/>
        </div>
      </template>
    </TransitionGroup>

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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { videos } from '../videoData';

const videosPerGroup = 3; // Number of videos per group
const videoCount = ref(videosPerGroup); // Number of videos to display initially

// Compute groups of videos based on videosPerGroup
const videoGroups = computed(() => {
  const groups = [];
  for (let i = 0; i < Math.ceil(videoCount.value / videosPerGroup); i++) {
    groups.push(videos.value.slice(i * videosPerGroup, (i + 1) * videosPerGroup));
  }
  return groups.flat(); // Flatten the array to directly loop through video items
});

const loadMore = () => {
  videoCount.value += 3;
};

// Reactive column count
const columnCount = ref(getColumnCount());

// Function to get column count based on window width
function getColumnCount() {
  if (window.innerWidth >= 1024) { // lg: 3 columns
    return 3;
  } else if (window.innerWidth >= 640) { // md: 2 columns
    return 2;
  } else { // sm: 1 column
    return 1;
  }
}

const updateColumnCount = () => {
  columnCount.value = getColumnCount();
};

onMounted(() => {
  window.addEventListener('resize', updateColumnCount);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumnCount);
});
</script>

<style>

  .bounce-enter-active {
  animation: bounce-in 0.1s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(0.1);
  }
  20% {
    transform: scale(0.2);
  }
  30% {
    transform: scale(0.3);
  }
  40% {
    transform: scale(0.4);
  }
  50% {
    transform: scale(0.5);
  }
  60% {
    transform: scale(0.6);
  }
  70% {
    transform: scale(0.7);
  }
  80% {
    transform: scale(0.8);
  }
  90% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>