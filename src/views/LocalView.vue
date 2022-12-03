<script setup lang="ts">
import * as d3 from "d3";
import { ref, watch, reactive } from "vue";
import { DataLoader } from "../stores/data";
import Navigator from "../components/Navigator.vue";
import BarChart from "../components/BarChart.vue";
import RadarChart from "../components/RadarChart.vue";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";

import { useRoute } from "vue-router";
import { Artists } from "@/stores/artists";

const route = useRoute();
const dataLoader = ref<DataLoader>(new DataLoader());
const dataExists = ref<Boolean>(false);

let artist: any = Artists.find((artist) => artist.name === route.params.id);

let selected = reactive([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

watch(
  () => route.params.id,
  () => {
    artist = Artists.find((artist) => artist.name === route.params.id);
    selected = reactive([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  }
);

const selectSong = (index: number) => {
  selected[index] = !selected[index];
};

const loadCsv = () => {
  d3.csv("./data.csv").then((csvData) => {
    if (!dataExists.value) {
      dataLoader.value.parseCsv(csvData);
      dataExists.value = true;
    }
  });
};
</script>

<template>
  <div style="width: 100%; height: 100%">
    <div
      class="bg-image"
      :style="{
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${artist.banner})`,
      }"
    >
      <div class="bg-title">
        {{ artist?.name }}
      </div>
    </div>
    <div class="container">
      <div class="left-container">
        <div v-for="index in selected.length" :key="artist?.songs[index - 1]">
          <img
            class="song-cover"
            v-bind:class="{ selected: selected[index - 1] }"
            :src="artist?.covers[index - 1]"
            @click="selectSong(index - 1)"
          />
          <div class="song-name">{{ artist?.songs[index - 1] }}</div>
        </div>
      </div>
      <RadarChart :artist="route.params.id"></RadarChart>
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
  width: 600px;
  min-width: 600px;
  margin-left: 32px;
  /* height: 600px; */
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
}

.song-cover {
  width: 160px;
  height: 160px;
  margin: 8px;
  cursor: pointer;
  border-radius: 12px;
}

.song-name {
  text-align: center;
  width: 160px;
}

.bg-image {
  width: 100%;
  height: 350px;
  background-size: cover;
  color: white;
  padding: 20px;
  font-size: 50pt;
}
</style>
