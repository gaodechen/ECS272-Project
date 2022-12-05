<template>
  <Visualization :width="mainContentWidth" :showPrototype="showPrototype" />
</template>

<script>
import Visualization from "../components/Visualization.vue";
import * as app from "../app/app";
import * as auth from "../app/authentication";
import * as player from "../app/player";
import * as testing from "../app/testing";
import * as vis from "../app/vis";

import * as log from "../dev/log";
export default {
  name: "Track",
  data() {
    return {
      searchQuery: "",
      synthesizerString: "",
      volume: 0.75,
      prevVolume: 0.75,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      testing: false,
      synthesizing: false,
      selectedTestSet: null,
      showPrototype: false,
      contentRatio: 0.97, //0.5 // 1.5
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    trackList() {
      return this.$store.getters.trackList;
    },
    selectedIndex() {
      return this.$store.getters.selectedIndex;
    },
    selectedTrack() {
      return this.$store.getters.selectedTrack;
    },
    seeker() {
      return this.$store.getters.seeker;
    },
    playing() {
      return this.$store.getters.playing;
    },
    mainContentStyle() {
      return {
        "padding-left": `${this.padding}px`,
        "padding-right": `${this.padding}px`,
      };
    },
    padding() {
      return Math.round((this.windowWidth - this.mainContentWidth) / 2 / 4) * 4;
    },
    mainContentWidth() {
      const size =
        Math.min(this.windowWidth, this.windowHeight) * this.contentRatio;
      return size;
    },
    allTestSets() {
      return testing.getAllTestSets();
    },
    activePlayer() {
      return this.$store.getters.playerActive;
    },
  },
  watch: {
    selectedIndex(newIndex, oldIndex) {
      //console.log(`We have ${newVal} selected!`)
    },
    selectedTrack(newTrack, oldTrack) {
      log.info(`We have ${newTrack.getName()} selected!`);
    },
    selectedTestSet(newTestSet, oldTestSet) {
      this.loadTestSet(newTestSet);
    },
    volume(newVol, oldVol) {
      player.setVolume(Math.pow(this.volume, 2));
    },
    activePlayer() {
      log.debug("Activeplayer Changed", this.activePlayer);
    },
  },
  components: {
    Visualization,
  },
  beforeCreate() {
    app.initialize();
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  mounted() {
    this._keyListener = function (e) {
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.

        this.$store.commit("toggleZoomed");
      }
      if (e.keyCode == 32 && !this.$store.getters.isInputFocused) {
        e.preventDefault();
        this.playing ? player.pause() : player.resume();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener);
  },
  methods: {
    color(i) {
      return vis.goldenRatioCategoricalColor(i, 0, 1);
    },
    search() {
      app.search(this.searchQuery);
    },
    loadTestSet() {
      app.loadTestSet(this.selectedTestSet);
    },
    getVolumeIcon() {
      if (this.volume > 0.6) return "mdi-volume-high";
      if (this.volume > 0.2) return "mdi-volume-medium";
      if (this.volume > 0) return "mdi-volume-low";
      return "mdi-volume-off";
    },
    clickVolume() {
      if (this.volume > 0) {
        this.prevVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.prevVolume;
      }
    },
    synthesize() {
      log.debug("Synthesizing", this.synthesizerString);

      app.synthesize(this.synthesizerString);
    },
    clickActivePlayer() {
      if (this.activePlayer) {
        player.releasePlayback();
      } else {
        player.transferPlayback();
      }
    },
  },
};
</script>

<style>
.track {
  overflow: hidden; /* Hide scrollbars */
}
.mainContent {
  display: inline-block;
  overflow: hidden;
}
.volumeSlider {
  height: 100%;
  width: 150px;
}
.trackScroll {
  /*overflow-x: auto;*/
}
.trackScroll::-webkit-scrollbar {
  display: none;
}
</style>
