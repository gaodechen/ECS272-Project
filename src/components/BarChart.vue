<template>
  <div id="bar">
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item v-for="item in features" :key="item">
            <UserOutlined />
            {{ item }}
          </a-menu-item>
        </a-menu>
      </template>
      <a-button id="bar-button">
        {{ feature }}
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import * as d3 from "d3";
import { DataLoader } from "@/stores/data";
import Scheme from "@/assets/scheme";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "BarChart",
  data() {
    return {
      feature: "popularity",
      features: [
        "popularity",
        "liveness",
        "energy",
        "danceability",
        "loudness",
        "tempo",
      ],
    };
  },
  props: {},
  mounted() {
    this.processData("popularity");
  },
  methods: {
    handleMenuClick(e) {
      this.feature = e.key;
      this.processData(e.key);
      d3.select("d3-tooltip").html(``).style("visibility", "hidden");
    },
    processData(feature) {
      const dataLoader = new DataLoader();
      return new Promise((res, rej) => {
        d3.csv("./data.csv").then((csvData) => {
          const array = dataLoader.getBarData(csvData, feature);
          d3.select("#bar").select("svg").remove();
          console.log(array);
          this.update(array);
        });
        res();
      });
    },
    handleBarClick(d) {
      this.$router
        .push({
          name: "artist",
          params: { id: d.artist },
        })
        .then(() => {
          console.log("Redirected to", this.$route);
        });
    },
    update(data) {
      const _this = this;
      const width = 600;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const svg = d3
        .select("#bar")
        .append("svg")
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      const staticColor = "hsla(160, 100%, 37%, 1)";
      const hoverColor = "hsla(160, 100%, 37%, 0.2)";
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.artist))
        .padding(0.2);
      const yMax = d3.max(data, (d) => d.yVal);
      const yMin = d3.min(data, (d) => d.yVal*0.9);
      // const y = d3.scaleLinear().domain(d3.extent(data, (d) => d.yVal)).range([height, 0]);
      const y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);
      const tooltip = d3
        .select("body")
        .select(".d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "10px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "4px")
        .style("color", "#fff");
      const rect = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(d.artist))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(0))
        .style("fill", (_, i) => Scheme.Themes[i])
        .attr("height", (d) => height - y(0))
        .on("mouseover", function (event, d) {
          tooltip
            .html(
              `<div>artist: ${d.artist}</div><div>${
                _this.feature
              }: ${d.yVal.toFixed(2)}</div>`
            )
            .style("visibility", "visible");
          d3.select(this).transition().attr("opacity", 0.4);
        })
        .on("mousemove", function (event, d) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function (event, d) {
          tooltip.html(``).style("visibility", "hidden");
          d3.select(this).transition().attr("opacity", 1);
        })
        .attr("cursor", "pointer")
        .on("click", (event, d) => {
          console.log(event, d);
          tooltip.html(``).style("visibility", "hidden");
          this.handleBarClick(d);
        });
      rect
        .transition()
        .ease(d3.easeLinear)
        .duration(0)
        .attr("y", (d) => y(d.yVal))
        .attr("height", (d) => height - y(d.yVal))
        .delay((d, i) => i * 100);
      const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);
      const yAxis = svg.append("g").attr("class", "myYaxis");
      x.domain(data.map((d) => d.artist));
      xAxis.transition().duration(400).call(d3.axisBottom(x));
      y.domain([0, d3.max(data, (d) => d.yVal)]);
      yAxis.transition().duration(400).call(d3.axisLeft(y));
      return svg.node();
    },
  },
};
</script>

<style scoped>
#bar-button {
  position: absolute;
  top: 100px;
  left: 40px;
  z-index: 999;
}

#bar {
  width: 50%;
  position: relative;
  /* margin-top: 100px; */
  margin-right: 150px;
}
</style>
