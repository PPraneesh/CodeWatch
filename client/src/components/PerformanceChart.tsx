import React, { useEffect } from 'react';
import CanvasJS from '@canvasjs/charts';

const PerformanceChart: React.FC = () => {
  useEffect(() => {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: ""
      },
      data: [{
        type: "line",
        indexLabelFontSize: 10,
        dataPoints: [
          { y: 450 },
          { y: 414 },
          { y: 520, indexLabel: "\u2191 highest", markerColor: "green", markerType: "triangle" },
          { y: 460 },
          { y: 450 },
          { y: 500 },
          { y: 480 },
          { y: 480 },
          { y: 410, indexLabel: "\u2193 lowest", markerColor: "red", markerType: "cross" },
          { y: 500 },
          { y: 480 },
          { y: 510 }
        ]
      }]
    });
    chart.render();
  }, []);

  return (
      <div id="chartContainer" style={{ height: 370, width: '70%', margin:"auto" }}></div>
  );
};

export default PerformanceChart;