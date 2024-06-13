import React, { useEffect } from 'react';
import CanvasJS from '@canvasjs/charts';

const StudentPerf: React.FC = () => {
  useEffect(() => {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: ""
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: [
          { y: 450 },
          { y: 414 },
          { y: 520, indexLabel: "\u2191 highest", markerColor: "red", markerType: "triangle" },
          { y: 500 },
          { y: 480 },
          { y: 410, indexLabel: "\u2193 lowest", markerColor: "DarkSlateGrey", markerType: "cross" },
          { y: 510 }
        ]
      }]
    });
    chart.render();
  }, []);

  return (
    <div>
      <div id="chartContainer" style={{ height: 370, width: '70%', margin:"auto" }}></div>
    </div>
  );
};

export default StudentPerf;