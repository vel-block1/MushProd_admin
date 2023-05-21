import React from "react";

const Linechart = () => {
  return (
    <>
      <div>
        <canvas id="myChart">
          <Line data={chartData} />
        </canvas>
      </div>
    </>
  );
};

export default Linechart;
