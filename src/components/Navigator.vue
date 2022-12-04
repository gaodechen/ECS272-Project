<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="vertical"
    @click="handleClick"
  >
    <div class="logo" @click="handleBackToHome"></div>
    <a-sub-menu v-for="item in artists" :key="item.name">
      <template #title>
        <a-avatar :src="item.avatar" size="large" />
        {{ item.name }}
      </template>
      <a-menu-item v-for="song in item.songs" :key="item.name + '.' + song">
        {{ song }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Icon from "@ant-design/icons-vue";
import { Artists } from "@/stores/artists";
import { useRouter } from "vue-router";
import MusicLogo from "@/public/logo.svg";

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
  margin: 20px;
  height: 180px;
  width: 180px;
  background-size: cover;
  background-image: url("@/../public/logo.svg");
  border-radius: 50%;
  border: 3px solid white;
  filter: drop-shadow(0 0 0.75rem rgba(231, 73, 104, 0.742));
}
</style>
