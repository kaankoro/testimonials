<template>
  <div itemscope itemtype="https://schema.org/VideoObject" class="video-container">
    <!-- Google rich search for -->
    <meta v-if="props.video.name" itemprop="name" :content="props.video.name">
    <meta v-if="props.video.duration" itemprop="duration" :content="props.video.duration">
    <meta v-if="props.video.thumbnailUrl" itemprop="thumbnailUrl" :content="props.video.thumbnailUrl">
    <meta v-if="props.video.description" itemprop="description" :content="props.video.description">
    <meta v-if="props.video.uploadDate" itemprop="uploadDate" :content="props.video.uploadDate">
    <template v-if="props.video.src">
      <media-player
        style="max-height: 400px;"
        v-if="isMounted"
        class="player"
        :title="props.video.name"
        muted
        :src="$src"
        crossOrigin
        playsInline
        ref="$player"
        @can-play="handleCanPlay"
        @mouseenter="videoControls"
        :description="props.video.description"
        :thumbnailUrl="props.video.thumbnailUrl"
        :uploadDate="props.video.uploadDate"
        :duration="props.video.duration"
        :style="{ aspectRatio: playerAspectRatio }"
      >
        <media-provider>
          <img v-if="!bClicked && !bHover && props.video.thumbnailUrl" class="h-full w-full absolute" :src="props.video.thumbnailUrl">
          <img/>
          <Transition>
            <div v-if="!isPlaying || (bClicked && bHover)" class="infobox">
              <VideoButton :isPlaying="isPlaying" />
              <VideoInfo :info="props.video.info" />
            </div>
          </Transition>
          <VideoSubtitles :_id="props.video.id" :currentTime="rCurrentTime" :playing="bClicked" />
        </media-provider>
        <media-audio-layout />

        <div :class="['overlay', { 'gray-overlay': showGrayScreen }]" :style="{ opacity: overlayOpacity, zIndex: overlayZIndex }">
          <div class="spinner" v-if="showGrayScreen"></div>
        </div>
      </media-player>
      <div class="transcript bg-gray-100 border" v-html="_transcript"></div>
    </template>
    <template v-else>
      <div v-if="props.video.referrer">{{ props.video.referrer }}</div>
      <div class="p-4 bg-gray-100 rounded-lg shadow-md border">
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
      // Add event listener for 'loadedmetadata' to ensure video metadata is loaded
      videoElement.addEventListener('loadedmetadata', () => {
        const aspectRatio = `${videoElement.videoWidth}/${videoElement.videoHeight}`
        playerAspectRatio = aspectRatio;

        startTranscriptHighlightLoop();
      });

    }
  }
});

function videoControls() {
  if (bClicked.value) return;
  bHover.value = true;
  const player = $player.value;
  let interval;

  function clearEventListeners() {
    player.removeEventListener('mouseleave', mouseLeaveHandler);
    player.removeEventListener('click', clickHandler);
    player.removeEventListener('mouseleave', resetMouseLeaveHandler);
    player.removeEventListener('mouseenter', resetMouseEnterHandler);
    player.removeEventListener('click', togglePlayPauseHandler);
  }

  function mouseLeaveHandler() {
    clearInterval(interval);
    if (!bClicked.value) {
      player.currentTime = 0;
      player.pause();
    }
    bHover.value = false;
    player.removeEventListener('mouseleave', mouseLeaveHandler);
  }

  function clickHandler() {
    clearInterval(interval);
    if (!bClicked.value) {
      player.muted = false;
      player.currentTime = 0;
      player.play();
      isPlaying.value = true;
      bClicked.value = true;
      
      // Add event listeners for hover and pause functionality after the video is clicked
      player.addEventListener('mouseleave', resetMouseLeaveHandler);
      player.addEventListener('mouseenter', resetMouseEnterHandler);
      player.addEventListener('click', togglePlayPauseHandler);
    }
    player.removeEventListener('click', clickHandler);
  }

  function resetMouseLeaveHandler() {
    bHover.value = false;
  }

  function resetMouseEnterHandler() {
    bHover.value = true;
  }

  function togglePlayPauseHandler() {
    if (player.paused) {
      player.play();
      isPlaying.value = true;
    } else {
      player.pause();
      isPlaying.value = false;
    }
  }

  function resetVideo() {
    clearInterval(interval);
    player.currentTime = 0;
    player.pause();
    bClicked.value=false
    isPlaying.value=false
    clearEventListeners();
  }

  if (player.currentTime <= 0.1 && isReadyToPlay.value) { // Check if media is ready to play
    player.play();
    interval = setInterval(() => {
      if (player.currentTime >= 3) {
        player.currentTime = 0;
      }
    }, 100);
    player.addEventListener('mouseleave', mouseLeaveHandler);
    player.addEventListener('click', clickHandler);
  }

  // Reset video on certain conditions, e.g., end of playback
  player.addEventListener('ended', resetVideo);
}


</script>
