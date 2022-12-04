<script setup lang="ts">
import BarChart from "../components/BarChart.vue";
import ChordChart from "../components/ChordChart.vue";
</script>

<template>
  <a-layout class="global-container">
    <div class="global-header">
      <div class="global-header-title">Spotify Top Hits</div>
    </div>
    <a-layout-content>
      <div class="chart-container">
        <ChordChart></ChordChart>
        <BarChart></BarChart>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.global-header {
  height: 128px;
  text-align: center;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
}

.chart-container {
  display: flex;
  justify-content: space-evenly;
}

.global-container {
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}
</style>
