<script setup lang="ts">
import { RouterView } from "vue-router";
import Navigator from "./components/Navigator.vue";
</script>

<template>
  <a-layout>
    <a-layout-sider width="255" style="background: #fff">
      <Navigator />
    </a-layout-sider>
    <RouterView />
  </a-layout>
</template>

<style scoped>
#root,
body,
html {
  width: 100%;
  height: 100%;
}
</style>
