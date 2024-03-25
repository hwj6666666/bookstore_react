import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

function MyChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    var myChart = echarts.init(chartRef.current);
    var option = {
      legend: {
        top: "bottom",
        textStyle: {
          color: "white",
          fontSize: 28,
        },
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          label: {
            color: "white",
            fontSize: 28,
          },
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" },
          ],
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return (
    <div
      className="backdrop-blur-lg"
      style={{ width: 1000, height: 700 }}
      ref={chartRef}
    />
  );
}

export default MyChart;
