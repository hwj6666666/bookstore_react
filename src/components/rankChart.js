import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

function MyChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    var myChart = echarts.init(chartRef.current);
    var option = {
      legend: {
        show: false,
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
            fontSize: 14,
          },
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 100],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 20, name: "Harry Potter and the Prisoner of Azkaban" },
            { value: 40, name: "Harry Potter and the Chamber of Secrets" },
            { value: 80, name: "Harry Potter and the Philosopher's Stone" },
          ],
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return (
    <div
      className="flex justify-center items-center w-full h-full"
      ref={chartRef}
    />
  );
}

export default MyChart;
