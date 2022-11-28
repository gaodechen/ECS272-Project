<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
import { DataLoader } from "../models/data";

defineProps({
  msg: String,
});

const dataLoader = ref<DataLoader>(new DataLoader());
const dataExists = ref<Boolean>(false);

const drawFromCsv = () => {
  d3.csv("./data.csv").then((csvData) => {
    if (!dataExists.value) {
      dataLoader.value.parseCsv(csvData);
      dataExists.value = true;
    }
  });
};
</script>

<template>
  <div class="greetings">
    {{ drawFromCsv() }}
    <h1 class="green">{{ msg }}</h1>
    <h3>
      CSV loaded
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
