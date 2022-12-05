<script setup lang="ts">
import { watch } from "vue";

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Artists } from "@/stores/artists";

const artist = Artists[Artists.length - 1];
const route = useRoute();

let trackId = route.params.trackId;
console.log(trackId);

watch(
  () => route.params.trackId,
  () => {}
);
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
      <iframe
        :src="`http://localhost:8080/track/${trackId}`"
        width="100%"
        height="530px"
        frameborder="0"
      >
      </iframe>
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
  height: 100%;
  display: flex;
  justify-self: center;
  align-items: center;
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
