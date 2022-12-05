<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="vertical"
    @click="handleClick"
    class="menu"
  >
    <div class="logo" @click="handleBackToHome"></div>
    <a-sub-menu v-for="item in artists" :key="item.name">
      <template #title>
        <a-avatar :src="item.avatar" size="large" />
        {{ item.name }}
      </template>
      <a-menu-item v-for="song in item.songs" :key="item.name + '.' + song" class="men-item">
        {{ song }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Artists } from "@/stores/artists";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
  },
  data() {
    return {
      artists: Artists,
    };
  },
  setup() {
    const state = reactive({
      selectedKeys: [],
      openKeys: [],
    });
    const router = useRouter();
    const handleClick = (menuInfo: any) => {
      const name = menuInfo.key.split(".")[0];
      router
        .push({
          name: "artist",
          params: { id: name },
        })
        .then(() => {});
    };
    const handleBackToHome = () => {
      router.push("/");
    };
    return {
      ...toRefs(state),
      handleClick,
      handleBackToHome,
    };
  },
});
</script>

<style scoped>
.logo {
  margin: 20px auto;
  height: 150px;
  width: 150px;
  background-size: cover;
  background-image: url("@/../public/logo.svg");
  border-radius: 50%;
  filter: drop-shadow(0 0 0.75rem rgba(231, 73, 104, 0.742));
}
.menu {
  width: 256px;
  height: 100%;
}
</style>
