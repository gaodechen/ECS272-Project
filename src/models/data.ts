import * as d3 from "d3";

export class DataLoader {
  private csvData: any = null;
  static StringColumns = ["artist", "genre", "song"];
  static IntegerColumns = ["duration_ms", "key", "mode", "popularity", "year"];
  static BooleanColumns = ["explicit"];

  parseCsv = (csvData: any) => {
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
      }
    });

    console.log("Raw:", csvData);
    console.log("Group sum:", this.sumBy("artist", "popularity"));
    console.log("Group average:", this.averageBy("artist", "popularity"));
    console.log("Group size:", this.sumBy("artist", "length"));
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
}
