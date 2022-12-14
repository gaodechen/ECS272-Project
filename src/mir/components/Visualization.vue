<template>
  <div class="visualization">
    <div style="height: 5px"></div>

    <svg
      v-if="!loadingTrack && tsneReady"
      class="tsneContainer"
      :style="`height: ${tsneSize + 5 * 20}px; width: ${width}px; left: ${10}`"
    >
      <line
        v-for="index in tsneCoords.length - 2"
        :key="index + 'clusterline'"
        :x1="tsneCoordX(tsneCoords[index][0])"
        :y1="tsneCoordY(tsneCoords[index][1])"
        :x2="tsneCoordX(tsneCoords[index + 1][0])"
        :y2="tsneCoordY(tsneCoords[index + 1][1])"
        :stroke="clusterColor(clusters[index])"
        style="stroke-opacity: 0.1"
        stroke-width="2"
      />
      <circle
        v-for="(coord, index) in tsneCoords"
        :key="index + 'clustercircle'"
        :r="
          isPlayingSample(index)
            ? 5 + tsneDynamics(index) * 10
            : 3 + tsneDynamics(index) * 5
        "
        :cx="
          tsneCoordX(coord[0]) -
          (isPlayingSample(index)
            ? 5 + tsneDynamics(index) * 10
            : 3 + tsneDynamics(index) * 5) /
            2
        "
        :cy="
          tsneCoordY(coord[1]) -
          (isPlayingSample(index)
            ? 5 + tsneDynamics(index) * 10
            : 3 + tsneDynamics(index) * 5) /
            2
        "
        :class="
          isPlayingSample(index) ? 'segmentCirclePlaying' : 'segmentCircle'
        "
        :fill="isPlayingSample(index) ? 'white' : clusterColor(clusters[index])"
      />

      <circle
        :r="5 + tsneDynamics(playingSample) * 10"
        :cx="
          tsneCoordX(tsneCoords[playingSample][0]) -
          (5 + tsneDynamics(playingSample) * 10) / 2
        "
        :cy="
          tsneCoordY(tsneCoords[playingSample][1]) -
          (5 + tsneDynamics(playingSample) * 10) / 2
        "
        :class="'playingSegmentCircle'"
        :style="`transition:  cx ${track.features.sampleDuration}s linear, cy ${track.features.sampleDuration}s linear;`"
        :fill="'white'"
      />
      <rect
        v-for="(clusterSection, index) in clusterSections"
        :key="index + 'clustersection'"
        class="clusterRect"
        :fill="clusterColor(clusterSection.cluster)"
        :x="samplePosNormalized(clusterSection.start) * width"
        :y="tsneSize + 20 * clusterSection.cluster"
        :width="
          samplePosNormalized(clusterSection.end - clusterSection.start) * width
        "
        :height="20"
      ></rect>
      <rect
        class="seekerRect"
        :x="seekerNormalized * width - 1.25"
        :y="tsneSize"
        :width="2.5"
        :height="20 * 6"
        fill="rgb(255,255,255,0.3)"
      ></rect>
    </svg>
    <HolisticStructure :width="width" />

    <TimbreSegmentedGraph :width="width" />
  </div>
</template>

<script lang="ts">
import HolisticStructure from "./visualizations/HolisticStructure.vue";
import TimbreSegmentedGraph from "./visualizations/TimbreSegmentedGraph.vue";

import * as vis from "../app/vis";

export default {
  props: ["width", "showPrototype"],
  components: {
    HolisticStructure,
    TimbreSegmentedGraph,
  },
  data() {
    return {
      readyForPrototypeVis: false,
      tsneReady: false,
      tsneSize: this.width * 0.75,
    };
  },
  watch: {
    showPrototype() {
      if (this.showPrototype && this.readyForPrototypeVis) {
        setTimeout(() => this.emitter.emit("readyForPrototypeVis"), 0);
      }
    },
    track() {
      this.readyForPrototypeVis = false;
    },
  },
  computed: {
    loadingTrack() {
      return this.$store.state.loadingTrack;
    },
    seekerNormalized() {
      return (
        this.$store.getters.seeker / (this.track.getAnalysisDuration() * 1000)
      );
    },
    seekerTime() {
      return this.$store.getters.seeker / 1000;
    },
    track() {
      console.log("track", this.$store.getters.selectedTrack);
      return this.$store.getters.selectedTrack;
    },
    height() {
      return this.width;
    },
    zoomed() {
      return this.$store.state.isZoomed;
    },
    playing() {
      return this.$store.getters.playing;
    },
    tsneCoords() {
      return this.track.tsneCoords;
    },
    clusters() {
      return this.track.clusters;
    },
    clusterSections() {
      return this.track.clusterSections;
    },
    playingSample() {
      return Math.ceil(this.seekerTime / this.track.features.sampleDuration);
    },
  },
  mounted() {
    this.emitter.on("readyForPrototypeVis", () => {
      this.readyForPrototypeVis = true;
    });
    this.emitter.on("tsneReady", () => {
      this.tsneReady = true;
    });
  },

  methods: {
    visChanged(newVis, oldVis) {},
    clusterColor(index) {
      return vis.goldenRatioCategoricalColor(index, 0, 1);
    },
    isPlayingSample(index) {
      return (
        index <= this.seekerTime / this.track.features.sampleDuration &&
        index + 1 > this.seekerTime / this.track.features.sampleDuration
      );
    },
    samplePosNormalized(sample) {
      return (
        (sample * this.track.features.sampleDuration) /
        this.track.getAnalysisDuration()
      );
    },
    tsneCoord(x, y) {
      return [this.tsneCoordX(x), this.tsneCoordY(y)];
    },
    tsneCoordX(x) {
      return this.width / 2 + (x * this.tsneSize) / 2;
    },
    tsneCoordY(y) {
      return 80 + ((y + 1) * this.tsneSize) / 2;
    },
    tsneDynamics(index) {
      const fraction = index / this.tsneCoords.length;
      return this.track.features.directLoudness[
        Math.floor(this.track.features.directLoudness.length * fraction)
      ];
    },
  },
};
</script>

<style>
.seekerSVGWrapper {
  position: relative;
}
.seekerSVG {
  position: absolute;
  z-index: 10;
}
.floatingTime {
  position: fixed;
  z-index: 1000;
  right: 5px;
  bottom: 0%;
}
.segmentCircle {
  transition: r 1.5s ease-out, fill 1.5s ease-out, cx 0.5s, cy 0.5s; /*, cx 1s ease, cy 1s ease;*/
}
.segmentCirclePlaying {
  transition: r 0.1s ease-in, fill 0.1s ease-in;
}
</style>
