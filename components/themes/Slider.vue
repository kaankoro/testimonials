<template>
  <div class="video-gallery relative">
    <div class="flex justify-between items-center mb-4">
      <button
        class="slider-button bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        @click="slideLeft"
        :disabled="slidePosition === 0"
      >
        ◀
      </button>
      <button
        class="slider-button bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        @click="slideRight"
        :disabled="slidePosition === -maxSlide"
      >
        ▶
      </button>
    </div>
    <div class="slider-container overflow-hidden">
      <div class="slider flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(${slidePosition}px)` }">
        <div v-for="video in displayedVideos" :key="video.id" class="video-wrapper flex-shrink-0" :style="{ width: videoWidth + 'px' }">
          <VideoPlayer
            :video="video"
            class="h-full"
            :style="{ opacity: video.visible ? 1 : 0.5, transition: 'opacity 0.5s ease' }"
          />
          <div v-if="!video.visible"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { videos } from '../videoData';

const videoCount = ref(3); // Number of videos to display initially
const slidePosition = ref(0); // Initial slide position
const containerWidth = ref(0); // Width of the slider container
const videoWidth = ref(0); // Width of each video item

const displayedVideos = computed(() => {
  if (videos.value) {
    return videos.value.map((video, index) => ({
      ...video,
      visible: index >= slideIndex.value && index < slideIndex.value + videoCount.value
    }));
  } else {
    return [];
  }
});

const maxSlide = computed(() => {
  return (videos.value.length - videoCount.value) * videoWidth.value;
});

const slideIndex = computed(() => -Math.floor(slidePosition.value / videoWidth.value));

const slideRight = () => {
  if (slidePosition.value > -maxSlide.value) {
    slidePosition.value -= videoWidth.value;
  }
};

const slideLeft = () => {
  if (slidePosition.value < 0) {
    slidePosition.value += videoWidth.value;
  }
};

const updateVideoWidth = () => {
  if (videoCount.value > 0) {
    videoWidth.value = containerWidth.value / videoCount.value;
  }
};

onMounted(() => {
  const container = document.querySelector('.slider-container');
  if (container) {
    containerWidth.value = container.clientWidth;
    updateVideoWidth();
    window.addEventListener('resize', () => {
      containerWidth.value = container.clientWidth;
      updateVideoWidth();
    });
  }
});
</script>
