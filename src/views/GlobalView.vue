<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
import { DataLoader } from "../stores/data";
import BarChart from "../components/BarChart.vue";

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
  <BarChart></BarChart>
</template>

<style scoped></style>
