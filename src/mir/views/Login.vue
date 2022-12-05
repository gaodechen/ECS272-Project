<template>
  <a-layout class="global-container">
    <div class="global-header">
      <div class="global-header-title" @click="spotifyAuthorize">
        Connect to Spotify API
      </div>
    </div>
  </a-layout>
</template>

<script lang="ts">
export default {
  name: "Login",
  components: {},
  methods: {
    spotifyAuthorize() {
      window.location.href = "http://localhost:5000/api/spotify/login";
    },
  },
};
</script>

<style scoped>
.global-header {
  height: 128px;
  text-align: center;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  filter: drop-shadow(0 0 0.75rem rgba(231, 73, 104, 0.742));
}

.global-container {
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}
</style>
