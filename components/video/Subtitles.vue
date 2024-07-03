<template>
  <div class="subtitles">
    {{ currentLine }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { videos } from '../videoDataJson';

const props = defineProps({
  _id: Number,
  currentTime: Number,
  playing: Boolean
});

// Reactive variables
const currentLine = ref('');

// Function to update currentLine based on currentTime
function updateCurrentLine(video) {
  const currentTime = props.currentTime;
  for (const cue of video.tracks[0].content.cues) {
    if (currentTime >= cue.startTime && currentTime <= cue.endTime && props.playing) {
      currentLine.value = cue.text;
      return; // Exit loop once the correct cue is found
    }
  }
  currentLine.value = ''; // Clear currentLine if no matching cue is found
}

// Watch for changes in props._id and update subtitles accordingly
watch(() => props._id, () => {
  const video = videos.value.find(v => v.id == props._id);
  if (video) {
    updateCurrentLine(video);
  }
});

// Update currentLine initially on component mount
onMounted(() => {
  setInterval(() => {
    const video = videos.value.find(v => v.id == props._id);
    if (video) {
      updateCurrentLine(video);
    }
  }, 100);
});

</script>
  