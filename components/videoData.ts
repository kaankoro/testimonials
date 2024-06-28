// videoData.ts

export const videos = ref([
  {
    id: 1,
    src: '/vertical.mp4',
    name: 'titdle',
    description: 'selam millet',
    info: {
      score: 4,
      name: 'Kaan Koroglu',
      description: 'test',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'Merhaba Dünya' },
            { startTime: 2, endTime: 5, text: 'dünya' },
            { startTime: 5, endTime: 10, text: 'kaan' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
            { startTime: 18, endTime: 22, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 2,
    src: '/arda_guler.mp4',
    info: {
      score: 4,
      name: 'Kaan Koroglu',
      description: 'test',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'Merhaba Dünya' },
            { startTime: 2, endTime: 5, text: 'dünya' },
            { startTime: 5, endTime: 10, text: 'kaan' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
            { startTime: 18, endTime: 22, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 3,
    src: 'youtube/_cMxraX_5RE',
    info: {
      score: 5,
      name: 'Hasan Köroğlu',
      description: 'güzeldi',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'Dünya' },
            { startTime: 2, endTime: 5, text: 'dünya' },
            { startTime: 5, endTime: 10, text: 'kaan' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
            { startTime: 18, endTime: 22, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 4,
    referrer:"facebook",
    info: {
      score: 5,
      name: 'Kaan Köroğlu',
      description: 'Developer',
    },
    transcript: 'hayatında görüp görebileceğin en iyi uygulama'
  },
  {
    id: 5,
    src: 'https://files.vidstack.io/sprite-fight/720p.mp4',
    info: {
      score: 2,
      name: 'İsim Soyisim',
      description: 'kötü',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'a' },
            { startTime: 2, endTime: 5, text: 'b' },
            { startTime: 5, endTime: 10, text: 'c' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 6,
    src: '/arda_guler.mp4',
    info: {
      score: 4,
      name: 'Kaan Koroglu',
      description: 'test',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'Merhaba Dünya' },
            { startTime: 2, endTime: 5, text: 'dünya' },
            { startTime: 5, endTime: 10, text: 'kaan' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
            { startTime: 18, endTime: 22, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 7,
    src: 'youtube/_cMxraX_5RE',
    info: {
      score: 5,
      name: 'Hasan Köroğlu',
      description: 'güzeldi',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'Dünya' },
            { startTime: 2, endTime: 5, text: 'dünya' },
            { startTime: 5, endTime: 10, text: 'kaan' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
            { startTime: 18, endTime: 22, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 8,
    info: {
      score: 5,
      name: 'Kaan Köroğlu',
      description: 'Developer',
    },
    transcript: 'hayatında görüp görebileceğin en iyi uygulama'
  },
  {
    id: 9,
    src: 'https://files.vidstack.io/sprite-fight/720p.mp4',
    info: {
      score: 2,
      name: 'İsim Soyisim',
      description: 'kötü',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'a' },
            { startTime: 2, endTime: 5, text: 'b' },
            { startTime: 5, endTime: 10, text: 'c' },
            { startTime: 11, endTime: 12, text: '1 saniye bosluk' },
            { startTime: 12, endTime: 14, text: 'dünya' },
            { startTime: 14, endTime: 16, text: 'kola' },
            { startTime: 16, endTime: 18, text: 'dünya' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 10,
    src: 'https://files.vidstack.io/sprite-fight/360p.mp4',
    info: {
      score: 2,
      name: 'İsim Soyisim',
      description: 'kötü',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'a' },
            { startTime: 2, endTime: 5, text: 'b' },
          ],
        },
        default: true,
      },
    ],
  },
  {
    id: 11,
    src: 'https://files.vidstack.io/sprite-fight/240p.mp4',
    info: {
      score: 2,
      name: 'İsim Soyisim',
      description: 'kötü',
    },
    tracks: [
      {
        label: 'English',
        kind: 'captions',
        language: 'en-US',
        type: 'json',
        content: {
          regions: [],
          cues: [
            { startTime: 0, endTime: 2, text: 'a' },
            { startTime: 2, endTime: 5, text: 'b' },
          ],
        },
        default: true,
      },
    ],
  },
  
]);
