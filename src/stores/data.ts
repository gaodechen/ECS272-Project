import * as d3 from "d3";

export class DataLoader {
  private csvData: any = null;
  private csvNorm: any = null;
  static StringColumns = ["artist", "genre", "song"];
  static IntegerColumns = ["duration_ms", "key", "mode", "popularity", "year"];
  static BooleanColumns = ["explicit"];

  parseCsv = (csvData: any) => {
    csvData.forEach((d: any) => {
      for (const column of csvData.columns) {
        if (DataLoader.BooleanColumns.includes(column)) {
          d[column] = d[column] == "True";
        } else if (DataLoader.IntegerColumns.includes(column)) {
          d[column] = parseInt(d[column]);
        } else if (!DataLoader.StringColumns.includes(column)) {
          d[column] = parseFloat(d[column]);
        }
      }
    });
    const csvNorm = structuredClone(csvData);
    for (const column of csvNorm.columns) {
      if (
        !DataLoader.BooleanColumns.includes(column) &&
        !DataLoader.StringColumns.includes(column)
      ) {
        const [vMax, vMin] = [
          d3.max(csvNorm, (d) => d[column]),
          d3.min(csvNorm, (d) => d[column]),
        ];
        csvNorm.forEach((d: any) => {
          d[column] = (d[column] - vMin) / (vMax - vMin);
        });
      }
    }
    this.csvData = csvData;
    this.csvNorm = csvNorm;
  };

  groupBy = (groupBy: string) => {
    return d3.group(this.csvData, (d: any) => d[groupBy]);
  };

  sumBy = (groupBy: string, sumBy: string = "length") => {
    if (sumBy === "length") {
      return d3.rollup(
        this.csvData,
        (d: any) => d.length,
        (d: any) => d[groupBy]
      );
    }
    return d3.rollup(
      this.csvData,
      (v: any) => d3.sum(v, (d: any) => d[sumBy]),
      (d: any) => d[groupBy]
    );
  };

  averageBy = (groupBy: string, sumBy: string) => {
    return d3.rollup(
      this.csvData,
      (v: any) => d3.mean(v, (d: any) => d[sumBy]),
      (d: any) => d[groupBy]
    );
  };

  getBarData = (csvData: any, feature: any) => {
    this.csvData = csvData;

    csvData.forEach((d: any) => {
      for (const column of csvData.columns) {
        if (DataLoader.BooleanColumns.includes(column)) {
          d[column] = d[column] == "True";
        } else if (DataLoader.IntegerColumns.includes(column)) {
          d[column] = parseInt(d[column]);
        } else if (!DataLoader.StringColumns.includes(column)) {
          d[column] = parseFloat(d[column]);
        }
        if (column === "loudness") {
          d[column] = -d[column];
        }
      }
    });

    const array = Array.from(
      this.sumBy("artist", "popularity"),
      ([artist, yVal]) => ({ artist, yVal })
    ).sort((a: any, b: any) => b.yVal - a.yVal);

    const topArtist = array.slice(0, 10);

    const result = this.averageBy("artist", feature);

    topArtist.map((item) => {
      item.yVal = result.get(item.artist);
    });

    return topArtist;
  };

  getRadarData = (artist: string, songs: string[], attributes: string[]) => {
    const csvData = this.csvNorm;
    const group = d3.filter(csvData, (d: any) => {
      return (
        d.artist === artist &&
        (songs.length === 0 || (songs.length > 0 && songs.includes(d.song)))
      );
    });
    const sumGroup = [];
    for (const attribute of attributes) {
      sumGroup.push({
        axis: attribute,
        value: d3.mean(group, (d: any) => d[attribute]) as number,
      });
    }
    return sumGroup;
  };
}
