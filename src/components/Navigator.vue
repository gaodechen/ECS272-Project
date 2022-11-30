<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
import { DataLoader } from "../models/data";
import { Artists } from "../models/artists";
</script>

<template>
  <a-list item-layout="horizontal" :data-source="Artists">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.description">
          <template #title>
            {{ item.name }}
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
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
