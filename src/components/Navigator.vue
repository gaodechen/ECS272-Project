<script setup lang="ts">
import * as d3 from "d3";
import { ref, watch } from "vue";
import { DataLoader } from "@/stores/data";
import { Artists } from "@/stores/artists";
import { RouterLink } from "vue-router";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const handleClick = (name: string) => {
  router
    .push({
      name: "artist",
      params: { id: name },
    })
    .then(() => {
      console.log("Updated", route.params.id);
    });
};

watch(
  () => route.params.id,
  () => {
    console.log(route.params.id);
  }
);
</script>

<template>
  <a-list item-layout="horizontal" :data-source="Artists">
    <template #renderItem="{ item }">
      <a-list-item @click="handleClick(item.name)">
        <a-list-item-meta>
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
