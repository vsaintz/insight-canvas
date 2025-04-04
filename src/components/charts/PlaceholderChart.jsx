import ReactECharts from 'echarts-for-react';

const PlaceholderChart = () => {
  const option = {
    backgroundColor: '#1E1E1E',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#888',
          width: 1,
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 30 }, (_, i) => `May ${i + 1}`),
      axisLine: {
        lineStyle: { color: '#555' },
      },
      axisLabel: {
        color: '#aaa',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: { color: '#444' },
      },
      axisLabel: {
        color: '#aaa',
      },
    },
    series: [
      {
        name: 'Series 1',
        type: 'line',
        smooth: true,
        showSymbol: false, // Disable dots on data points
        data: [30, 60, 45, 70, 80, 60, 55, 90, 100, 80, 60, 40, 70, 110, 130, 100, 90, 70, 60, 80, 120, 100, 60, 90, 110, 95, 85, 70, 60, 50],
        areaStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        lineStyle: {
          color: '#999',
          width: 1,
        },
      },
      {
        name: 'Series 2',
        type: 'line',
        smooth: true,
        showSymbol: false, // Disable dots on data points
        data: [52, 88, 45, 63, 79, 58, 48, 82, 92, 77, 56, 38, 67, 105, 115, 95, 83, 61, 53, 72, 108, 91, 51, 81, 98, 86, 76, 62, 49, 102],
        areaStyle: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        lineStyle: {
          color: '#666',
          width: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default PlaceholderChart;
