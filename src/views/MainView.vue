<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
import { DataLoader } from "../models/data";
import { RouterLink, RouterView } from "vue-router";
import Navigator from "../components/Navigator.vue";
import BarChart from "../components/BarChart.vue";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";

const dataLoader = ref<DataLoader>(new DataLoader());
const dataExists = ref<Boolean>(false);

const loadCsv = () => {
  d3.csv("./data.csv").then((csvData) => {
    if (!dataExists.value) {
      dataLoader.value.parseCsv(csvData);
      dataExists.value = true;
    }
  });
};

</script>

<template>
  <a-layout :style="{ minHeight: '100%', width: '100%' }">
    <a-layout-content>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <Navigator />
        </a-layout-sider>
        <a-layout-content>
          <BarChart></BarChart>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>

</template>

<style scoped>
#root,
body,
html {
  height: 100%;
}

#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>