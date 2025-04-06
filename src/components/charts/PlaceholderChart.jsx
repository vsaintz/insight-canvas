import ReactECharts from 'echarts-for-react';

const PlaceholderChart = () => {
  const option = {
    backgroundColor: '#1E1E1E',
    title: {
      text: 'Visitor Trends - Last 30 Days',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#aaa',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#555',
          type: 'dashed',
        },
      },
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      textStyle: {
        color: '#fff',
      },
      borderWidth: 0,
    },
    legend: {
      data: ['Visitors'],
      top: 40,
      textStyle: {
        color: '#aaa',
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      axisLine: {
        lineStyle: {
          color: '#555',
        },
      },
      axisLabel: {
        color: '#aaa',
        fontSize: 12,
        interval: 4,
      },
      axisTick: {
        alignWithLabel: true,
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
        lineStyle: {
          color: '#444',
          type: 'dashed',
        },
      },
      axisLabel: {
        color: '#aaa',
        fontSize: 12,
      },
      min: 0,
      max: 250, // Adjusted to accommodate the fluctuating data
    },
    series: [
      {
        name: 'Visitors',
        type: 'line',
        smooth: 0.3, // Light smoothing to keep the natural waviness
        showSymbol: false,
        data: [
          112, 187, 95, 196, 135, 174, 150, 193, 51, 100, 78, 140, 68, 135, 199, 150, 190, 250, 111, 160, 120, 140, 104, 126, 157, 105, 59, 120, 197, 109

        ],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(153, 153, 153, 0.2)' }, // Adjusted to match #999
              { offset: 1, color: 'rgba(153, 153, 153, 0)' },
            ],
          },
        },
        lineStyle: {
          color: '#999',
          width: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(255, 255, 255, 0.2)',
          shadowOffsetY: 2,
        },
        emphasis: {
          lineStyle: {
            width: 3,
          },
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