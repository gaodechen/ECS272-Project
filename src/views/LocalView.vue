<script setup lang="ts">
import * as d3 from "d3";
import { watch, reactive } from "vue";
import { DataLoader } from "../stores/data";
import RadarChart from "../components/RadarChart.vue";
import { CheckCircleTwoTone } from "@ant-design/icons-vue";

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Artists } from "@/stores/artists";

const route = useRoute();
const router = useRouter();
const dataLoader = new DataLoader();

let artist: any = Artists.find((artist) => artist.name === route.params.id);
let state = reactive({
  selected: Array<Boolean>(artist.songs.length).fill(false),
  radarData: Array<{ axis: string; value: number }>(),
  dataExists: false,
});

const radarAttributes = [
  "popularity",
  "liveness",
  "energy",
  "danceability",
  "loudness",
  "tempo",
];

d3.csv("../data.csv").then((csvData) => {
  dataLoader.parseCsv(csvData);
  const selectedSongs = artist.songs.filter(
    (_: any, index: number) => state.selected[index]
  );
  state.radarData = dataLoader.getRadarData(
    route.params.id as string,
    selectedSongs,
    radarAttributes
  );
  state.dataExists = true;
});

watch(
  () => route.params.id,
  () => {
    artist = Artists.find((artist) => artist.name === route.params.id);
    state.selected = Array<Boolean>(artist.songs.length).fill(false);
    state.radarData = dataLoader.getRadarData(
      route.params.id as string,
      [],
      radarAttributes
    );
  }
);

const selectSong = (index: number) => {
  state.selected[index] = !state.selected[index];
  state.radarData = dataLoader.getRadarData(
    route.params.id as string,
    artist.songs.filter((_: any, index: number) => state.selected[index]),
    radarAttributes
  );
};

const handleTrackClick = (index: number) => {
  /*
  router
    .push({
      name: "track",
      params: { trackId: artist.trackIds[index] },
    })
    .then(() => {}); */
  const trackUrl = `http://localhost:8080/track/${artist.trackIds[index]}`;
  window.open(trackUrl, "_blank", "noreferrer");
};
</script>

<template>
  <div class="local-container">
    <div
      class="bg-image"
      :style="{
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.50)), url(${artist.banner})`,
      }"
    >
      <div class="bg-title">
        {{ artist?.name }}
      </div>
    </div>
    <div class="container">
      <div class="left-container">
        <div
          v-for="index in state.selected.length"
          :key="artist?.songs[index - 1]"
        >
          <img
            class="song-cover"
            v-bind:class="{ selected: state.selected[index - 1] }"
            :src="artist?.covers[index - 1]"
            @click="selectSong(index - 1)"
          />
          <div class="song-name">
            <div class="song-text">{{ artist?.songs[index - 1] }}</div>
            <check-circle-two-tone
              v-if="artist.trackIds && artist.trackIds.length >= index"
              two-tone-color="#52c41a"
              @click="handleTrackClick(index - 1)"
            ></check-circle-two-tone>
          </div>
        </div>
      </div>
      <RadarChart
        :data="state.radarData"
        :radar-axis="radarAttributes"
        v-if="state.dataExists"
      ></RadarChart>
    </div>
  </div>
</template>

<style scoped>
.artist-title {
  text-align: center;
  margin: 0 16px;
  font-size: 32px;
}

.container {
  width: 100%;
  display: flex;
  justify-self: center;
  align-items: center;
}

.selected {
  opacity: 0.6;
  border: hsla(160, 100%, 37%, 0.6) 2px solid;
}

.left-container {
  width: 500px;
  min-width: 500px;
  margin-left: 32px;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
}

.song-cover {
  width: 140px;
  height: 140px;
  margin: 6px;
  cursor: pointer;
  border-radius: 12px;
}

.song-name {
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}

.bg-image {
  width: 100%;
  height: 350px;
  background-size: cover;
  color: white;
  padding: 20px;
  font-size: 50pt;
  opacity: 80%;
}
.local-container {
  width: 100%;
  height: 100%;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}
</style>
