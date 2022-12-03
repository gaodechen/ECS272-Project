<template>
  <div id="chord" style="width: 65%"></div>
</template>
<script>
import * as d3 from "d3";

export default {
  name: "ChordChart",
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const matrix = [
        [
          1.0, 0.119608, -0.318835, 0.04814, -0.060083, -0.082982, -0.001353,
          -0.086226, -0.004095, 0.062538, 0.00996, -0.006409, 0.022549,
          -0.116423, -0.033762,
        ],
        [
          0.119608, 1.0, 0.077361, 0.047308, 0.243799, -0.164212, 0.001795,
          -0.091265, 0.050653, 0.415445, -0.028032, -0.082605, 0.008238,
          -0.045397, 0.01465,
        ],
        [
          -0.318835, 0.077361, 1.0, -0.007294, 0.035444, -0.110265, 0.008588,
          0.017228, -0.007208, 0.003146, 0.040698, -0.05149, -0.026418,
          -0.20841, 0.077798,
        ],
        [
          0.04814, 0.047308, -0.007294, 1.0, -0.000143, -0.013404, 0.013561,
          0.030441, -0.01943, 0.021977, 0.022501, -0.048104, -0.010291,
          -0.011012, 0.011057,
        ],
        [
          -0.060083, 0.243799, 0.035444, -0.000143, 1.0, -0.103204, 0.035747,
          -0.035638, -0.068643, 0.140955, -0.062374, 0.021662, -0.127349,
          0.403787, -0.169074,
        ],
        [
          -0.082982, -0.164212, -0.110265, -0.013404, -0.103204, 1.0, -0.000642,
          0.651986, -0.044177, -0.058225, -0.447056, 0.040662, 0.153922,
          0.331756, 0.152305,
        ],
        [
          -0.001353, 0.001795, 0.008588, 0.013561, 0.035747, -0.000642, 1.0,
          -0.005229, -0.153319, 0.003769, 0.000719, -0.004053, -0.040827,
          0.035441, -0.009852,
        ],
        [
          -0.086226, -0.091265, 0.017228, 0.030441, -0.035638, 0.651986,
          -0.005229, 1.0, -0.027568, -0.081831, -0.312079, -0.103575, 0.101972,
          0.22825, 0.081655,
        ],
        [
          -0.004095, 0.050653, -0.007208, -0.01943, -0.068643, -0.044177,
          -0.153319, -0.027568, 1.0, 0.002192, 0.00921, -0.036433, 0.028334,
          -0.080279, 0.047445,
        ],
        [
          0.062538, 0.415445, 0.003146, 0.021977, 0.140955, -0.058225, 0.003769,
          -0.081831, 0.002192, 1.0, 0.002926, -0.062401, 0.056532, 0.069247,
          0.063192,
        ],
        [
          0.00996, -0.028032, 0.040698, 0.022501, -0.062374, -0.447056,
          0.000719, -0.312079, 0.00921, 0.002926, 1.0, -0.00322, -0.107766,
          -0.126129, -0.105533,
        ],
        [
          -0.006409, -0.082605, -0.05149, -0.048104, 0.021662, 0.040662,
          -0.004053, -0.103575, -0.036433, -0.062401, -0.00322, 1.0, -0.034818,
          -0.01066, 0.035442,
        ],
        [
          0.022549, 0.008238, -0.026418, -0.010291, -0.127349, 0.153922,
          -0.040827, 0.101972, 0.028334, 0.056532, -0.107766, -0.034818, 1.0,
          0.014737, 0.027449,
        ],
        [
          -0.116423, -0.045397, -0.20841, -0.011012, 0.403787, 0.331756,
          0.035441, 0.22825, -0.080279, 0.069247, -0.126129, -0.01066, 0.014737,
          1.0, -0.023973,
        ],
        [
          -0.033762, 0.01465, 0.077798, 0.011057, -0.169074, 0.152305,
          -0.009852, 0.081655, 0.047445, 0.063192, -0.105533, 0.035442,
          0.027449, -0.023973, 1.0,
        ],
      ];
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] < 0) {
            matrix[i][j] = -matrix[i][j];
          }
        }
      }
      console.log(matrix);

      const nameByIndex = {
        0: "duration_ms",
        1: "explicit",
        2: "year",
        3: "popularity",
        4: "danceability",
        5: "energy",
        6: "key",
        7: "loudness",
        8: "mode",
        9: "speechiness",
        10: "acousticness",
        11: "instrumentalness",
        12: "liveness",
        13: "valence",
        14: "tempo",
      };
      const indexByName = {
        duration_ms: 0,
        explicit: 1,
        year: 2,
        popularity: 3,
        danceability: 4,
        energy: 5,
        key: 6,
        loudness: 7,
        mode: 8,
        speechiness: 9,
        acousticness: 10,
        instrumentalness: 11,
        liveness: 12,
        valence: 13,
        tempo: 14,
      };
      const names = [
        "duration_ms",
        "explicit",
        "year",
        "popularity",
        "danceability",
        "energy",
        "key",
        "loudness",
        "mode",
        "speechiness",
        "acousticness",
        "instrumentalness",
        "liveness",
        "valence",
        "tempo",
      ];

      const width = 600;
      const height = 600;
      const margin = { top: 20, right: 30, bottom: 30, left: 80 };

      let color = d3.scaleOrdinal(
        names,
        d3.quantize(d3.interpolateRainbow, names.length)
      );
      let outerRadius = Math.min(width, height) * 0.5;
      let innerRadius = outerRadius - 124;
      let ribbon = d3.ribbon().radius(innerRadius);
      let arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(innerRadius + 20);
      let chord = d3
        .chord()
        .padAngle(0.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);
      let svg = d3
        .select("#chord")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      // .attr("font-size", font_size);

      const chords = chord(matrix);
      const group = svg
        .append("g")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

      group
        .append("path")
        .attr("fill", (d) => color(d.index))
        .attr("stroke", (d) => color(d.index))
        .attr("d", arc);

      group
        .append("text")
        .each((d) => {
          d.angle = (d.startAngle + d.endAngle) / 2;
        })
        .attr("dy", ".35em")
        .attr(
          "transform",
          (d) => `
        rotate(${(d.angle * 180) / Math.PI - 90})
        translate(${innerRadius + 26})
        ${d.angle > Math.PI ? "rotate(180)" : ""}`
        )
        .attr("text-anchor", (d) => (d.angle > Math.PI ? "end" : null))
        .attr("font-size", 10)
        .text((d) => nameByIndex[d.index]);

      svg
        .append("g")
        .attr("fill-opacity", 0.67)
        .selectAll("path")
        .data(chords)
        .join("path")
        .attr("fill", (d) => color(d.source.index))
        .attr("d", ribbon);

      return svg.node();
    },
  },
};
</script>

<style scoped>
#chord {
  width: 60%;
  /* margin-left: 100px; */
}

</style>
