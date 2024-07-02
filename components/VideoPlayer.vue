<template>
  <div itemscope itemtype="https://schema.org/VideoObject" class="video-container">
    <meta v-if="props.video.name" itemprop="name" :content="props.video.name">
    <meta v-if="props.video.duration" itemprop="duration" :content="props.video.duration">
    <meta v-if="props.video.thumbnailUrl" itemprop="thumbnail" :content="props.video.thumbnailUrl">
    <meta v-if="props.video.description" itemprop="description" :content="props.video.description">
    <template v-if="props.video.src">
      <media-player
        v-if="isMounted"
        class="player"
        :title="props.video.name"
        muted
        :src="$src"
        crossOrigin
        playsInline
        ref="$player"
        @can-play="handleCanPlay"
        @mouseenter="handleMouseEnter"
        :description="props.video.description"
        :thumbnailUrl="props.video.thumbnailUrl"
        :uploadDate="props.video.uploadDate"
        :duration="props.video.duration"
        :style="{ aspectRatio: playerAspectRatio }"
      >
      <media-provider style="max-height: 400px;">
        <img v-if="!bClicked && !bHover && props.video.thumbnailUrl" class="h-full w-full absolute" :src="props.video.thumbnailUrl"><img/>
          <div class="layer"></div>
          <VideoButton :isPlaying="isPlaying"/>
          <VideoInfo :info="props.video.info" />
          <VideoSubtitles :_id="props.video.id" :currentTime="rCurrentTime" :playing="isPlaying"/>
        </media-provider>
        <media-audio-layout />

        <div :class="['overlay', { 'gray-overlay': showGrayScreen }]" :style="{ opacity: overlayOpacity, zIndex: overlayZIndex }">
          <div class="spinner" v-if="showGrayScreen"></div>
        </div>  
      </media-player>
      <div class="transcript" v-html="_transcript"></div>
    </template>
    <template v-else>
      <div v-if="props.video.referrer">{{ props.video.referrer }}</div>
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
      <div class="mb-4">
        <p class="text-gray-800">{{ props.video.transcript }}</p> 
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ props.video.info.name }}</h2>
        <p class="text-gray-600">{{ props.video.info.description }}</p>
        <p class="text-gray-600">Score: {{ props.video.info.score }}</p>
      </div>
    </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/audio.css';
import 'vidstack/player/styles/default/layouts/video.css';
import 'vidstack/player';
import 'vidstack/player/layouts';
import { onMounted, ref, nextTick } from 'vue';
import { defineCustomElement, MediaPlayerElement } from 'vidstack/elements';

defineCustomElement(MediaPlayerElement);


const props = defineProps({
  video: Object,
});

const $player = ref<MediaPlayerElement | null>(null),
  $src = ref(props.video.src);

// Reactive variables
let isLoaded = ref(false);
let showGrayScreen = ref(true);
let overlayOpacity = ref(1);
let overlayZIndex = ref(1);
let bClicked = ref(false);
let bHover = ref(false);
let isPlaying = ref(false);
let rCurrentTime = ref(0);
let isMounted = ref(false);
let isReadyToPlay = ref(false); // New ref to track if media is ready

let _transcript = "";
let playerAspectRatio = "16/9"

// Methods
function handleCanPlay() {
  isLoaded.value = true;
  isReadyToPlay.value = true; // Set media as ready to play
  checkIfReadyToHideOverlay();
}

function checkIfReadyToHideOverlay() {
  if (isLoaded.value) {
    fadeOutOverlay();
  }
}

function fadeOutOverlay() {
  overlayOpacity.value = 0;
  setTimeout(() => {
    showGrayScreen.value = false;
    overlayZIndex.value = -1; // Move the overlay behind the video
  }, 500); // 0.5 seconds fade out
}

function updateTranscriptHighlight(currentTime: number) {
  if (props.video.tracks) {
    for (let i = 0; i < props.video.tracks[0].content.cues.length; ++i) {
      const cue = props.video.tracks[0].content.cues[i];
      const element = document.getElementById(`cue-${props.video.id}-${i}`);
      if (element) {
        if (currentTime >= cue.startTime && currentTime <= cue.endTime && bClicked.value) {
          element.style.backgroundColor = 'purple';
        } else {
          element.style.backgroundColor = 'transparent';
        }
      }
    }
  }
}

function startTranscriptHighlightLoop() {
  setInterval(() => {
    const currentTime = $player.value?.currentTime || 0;
    rCurrentTime.value = currentTime;
    updateTranscriptHighlight(currentTime);
  }, 100); // Check every 100 milliseconds
}

setTimeout(() => {
  checkIfReadyToHideOverlay();
}, 2000);

onMounted(async () => {
  isMounted.value = true;
  await nextTick(); // Ensure DOM is updated before accessing $player

  if ($player.value && props.video.tracks) {

    // Generate transcript with unique IDs for each cue
    for (let i = 0; i < props.video.tracks[0].content.cues.length; ++i) {
      const cue = props.video.tracks[0].content.cues[i];
      _transcript += `<span style="transition: background-color 0.3s;line-break: anywhere;" id="cue-${props.video.id}-${i}" class="transcript-item">${cue.text}</span>`;
    }

    const videoElement = $player.value?.querySelector('video');
    if (videoElement) {
      const aspectRatio = `${videoElement.videoWidth}/${videoElement.videoHeight}`;
      playerAspectRatio = aspectRatio;
    }

    // Start the transcript highlight loop
    startTranscriptHighlightLoop();
  }
});

// Loop preview
function handleMouseEnter() {
  if (bClicked.value) return;
  bHover.value = true;
  const player = $player.value;
  let interval;
  if (player.currentTime <= 0.1 && isReadyToPlay.value) { // Check if media is ready to play
    player.play();
    interval = setInterval(() => {
      if (player.currentTime >= 3) {
        player.currentTime = 0;
      }
    }, 100);
    player.addEventListener('mouseleave', () => {
      clearInterval(interval);
      if (!bClicked.value) {
        player.currentTime = 0;
        player.pause();
      }
      bHover.value = false;
    });
    player.addEventListener('click', () => {
      clearInterval(interval);
      if (!bClicked.value) {
        player.muted = false;
        player.currentTime = 0;
        player.play();
        isPlaying.value = true;
        bClicked.value = true;
        player.addEventListener('click', () => {
          if (player.paused) {
            player.play();
            isPlaying.value = true;
          } else {
            player.pause();
            isPlaying.value = false;
          }
        });
      }
    });
  }
}
</script>
