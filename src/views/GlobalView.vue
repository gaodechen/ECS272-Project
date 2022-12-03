<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
import { DataLoader } from "../stores/data";
import BarChart from "../components/BarChart.vue";
import ChordChart from "../components/ChordChart.vue";

const dataLoader = ref<DataLoader>(new DataLoader());
const dataExists = ref<Boolean>(false);

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
  <a-layout>
    <a-layout-header class="global-header">Spotify Top Hits</a-layout-header>
    <a-layout-content>
      <div class="global-container">
        <ChordChart></ChordChart>
        <BarChart></BarChart></div
    ></a-layout-content>
  </a-layout>
</template>

<style scoped>
.global-header {
  height: 128px;
  background: #e5e5e5;
  color: #000;
  text-align: center;
  font-size: 32px;
}
.global-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
