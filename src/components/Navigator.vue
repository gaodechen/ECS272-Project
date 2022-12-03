<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="vertical"
    @click="handleClick"
  >
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
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import * as d3 from "d3";
import { ref, watch } from "vue";
import { DataLoader } from "@/stores/data";
import { Artists } from "@/stores/artists";
import { RouterLink } from "vue-router";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
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
    const route = useRoute();
    const handleClick = (menuInfo: any) => {
      console.log(menuInfo);
      const name = menuInfo.key.split(".")[0];
      router
        .push({
          name: "artist",
          params: { id: name },
        })
        .then(() => {
          console.log("Updated", route.params.id);
        });
    };
    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>

<style scoped>
</style>
