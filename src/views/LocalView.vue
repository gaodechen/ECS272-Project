<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
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

const artist = Artists.find((artist) => artist.name === route.params.id);

console.log(artist)

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
  <h4>{{ artist?.name }}</h4>
  <a-image width="100%" :src="artist?.banner"></a-image>
  <RadarChart></RadarChart>
</template>

<style scoped></style>
