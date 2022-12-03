<template>
  <div class="radarChart" width="100%"></div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, watch } from "vue";
import { DataLoader } from "@/stores/data";
import Scheme from "@/assets/scheme";

const props = defineProps({
  data: {
    type: Array<any>,
    required: true,
  },
  radarAxis: {
    type: Array<String>,
    required: true,
  },
});

const svgId = ".radarChart";
const margin = { top: 50, right: 20, bottom: 50, left: 20 };
const windowWidth = 600;
const windowHeight = 600;
const renderWidth = windowWidth - margin.left - margin.right;
const renderHeight = windowHeight - margin.top - margin.bottom;
const numBlobs = 5;
const anglePerSection = (Math.PI * 2) / props.radarAxis.length;
const percentFormat = d3.format(".0%");
const outerCircleValue = 1;
const radius = Math.min(renderWidth / 2, renderHeight / 2);

const rScale = d3
  .scaleLinear()
  .range([0, radius])
  .domain([0, outerCircleValue])
  .clamp(true);
const radarLine = d3
  .lineRadial()
  .curve(d3.curveLinearClosed)
  .radius((d: any) => rScale(d.value))
  .angle((_, i) => i * anglePerSection);

const setupRadar = () => {
  d3.select(`${svgId}`).select("svg").remove();
  const svg = d3
    .select(`${svgId}`)
    .append("svg")
    .attr("viewBox", `0 0 ${windowWidth} ${windowHeight}`)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("class", "radarClass");

  const g = svg
    .append("g")
    .attr("class", "canvas")
    .attr(
      "transform",
      "translate(" +
        (renderWidth / 2 + margin.left) +
        "," +
        (renderHeight / 2 + margin.top) +
        ")"
    );

  const backgroundRadar = props.radarAxis.map((axis) => {
    return { axis: axis, value: 1 };
  });
  g.selectAll("path.radarBackground")
    .data([backgroundRadar])
    .join((enter) =>
      enter
        .append("path")
        .attr("class", "radarArea")
        .attr("d", (d) => radarLine(d))
        .style("fill", "url(#radar-gradient)")
        .attr("clip-path", "url(#radar-shape)")
        .selection()
    );
  g.append("defs")
    .attr("class", "radar-clip")
    .append("clipPath")
    .attr("id", "radar-shape")
    .attr("class", "radarArea")
    .append("path")
    .attr("d", radarLine(backgroundRadar));

  const defs = g.append("defs");
  const colorTransitions = Scheme.Transitions.Lime;
  const strokeTransitions = Scheme.Transitions.Grey;
  const backgroundGradient = defs
    .append("radialGradient")
    .attr("id", "radar-gradient")
    .attr("cx", "0.5")
    .attr("cy", "0.5")
    .attr("r", "0.5")
    .attr("fx", "0.5")
    .attr("fy", "0.5");
  backgroundGradient
    .append("stop")
    .attr("stop-color", colorTransitions[0])
    .attr("offset", "10%");
  backgroundGradient
    .append("stop")
    .attr("stop-color", colorTransitions[1])
    .attr("offset", "30%");
  backgroundGradient
    .append("stop")
    .attr("stop-color", colorTransitions[2])
    .attr("offset", "65%");
  backgroundGradient
    .append("stop")
    .attr("stop-color", colorTransitions[3])
    .attr("offset", "85%");

  const axisGrid = g.append("g").attr("class", "axisWrapper");

  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, numBlobs + 1).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", (d) => (radius / numBlobs) * d)
    .style("fill", strokeTransitions[0])
    .style("stroke", strokeTransitions[1])
    .style("fill-opacity", 0.1);

  axisGrid
    .selectAll(".axisLabel")
    .data(d3.range(1, numBlobs + 1).reverse())
    .enter()
    .append("text")
    .attr("class", "axisLabel")
    .attr("x", 4)
    .attr("y", function (d) {
      return (-d * radius) / numBlobs;
    })
    .attr("dy", "0.4em")
    .style("font-size", "10px")
    .attr("fill", strokeTransitions[2])
    .text((d) => percentFormat((outerCircleValue * d) / numBlobs));

  const axis = axisGrid
    .selectAll(".axis")
    .data(props.radarAxis)
    .enter()
    .append("g")
    .attr("class", "axis");
  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr(
      "x2",
      (_, i) =>
        rScale(outerCircleValue * 1.1) *
        Math.cos(anglePerSection * i - Math.PI / 2)
    )
    .attr(
      "y2",
      (_, i) =>
        rScale(outerCircleValue * 1.1) *
        Math.sin(anglePerSection * i - Math.PI / 2)
    )
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  axis
    .append("text")
    .attr("class", "legend")
    .style("font-size", "15px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr(
      "x",
      (_, i) =>
        rScale(outerCircleValue) *
        1.1 *
        Math.cos(anglePerSection * i - Math.PI / 2)
    )
    .attr(
      "y",
      (_, i) =>
        rScale(outerCircleValue) *
        1.1 *
        Math.sin(anglePerSection * i - Math.PI / 2)
    )
    .text((d) => d);
};

const drawRadar = (data: any) => {
  const svg = d3.select(`${svgId}`).select("svg");
  const g = svg.select("g.canvas");
  const defs = g.select("defs.radar-clip");
  const transitionDuration = 300;
  const transitionEffect = d3.easeCircle;
  defs
    .selectAll("clipPath.radarArea")
    .data([data])
    .join(
      (enter) =>
        enter
          .select("path")
          .transition()
          .duration(transitionDuration)
          .ease(transitionEffect)
          .attr("d", (d) => radarLine(d))
          .selection(),
      (update) =>
        update
          .select("path")
          .transition()
          .duration(transitionDuration)
          .ease(transitionEffect)
          .attr("d", (d) => radarLine(d))
          .selection(),
      (exit) => exit.remove()
    );

  const blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  let tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0);

  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data((d) => d)
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", 4 * 1.5)
    .attr("cx", function (d: any, i) {
      return rScale(d.value) * Math.cos(anglePerSection * i - Math.PI / 2);
    })
    .attr("cy", function (d: any, i) {
      return rScale(d.value) * Math.sin(anglePerSection * i - Math.PI / 2);
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", (d) => {
      const newX = parseFloat(d3.select(this).attr("cx")) - 10;
      const newY = parseFloat(d3.select(this).attr("cy")) - 10;

      tooltip
        .attr("x", newX)
        .attr("y", newY)
        .text(percentFormat(d.value))
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });
};

onMounted(() => {
  setupRadar();
  drawRadar(props.data);
});
</script>

<style>
.radarChart {
  width: 85%;
}
</style>
