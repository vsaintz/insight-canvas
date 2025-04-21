import React from 'react';
import ReactECharts from 'echarts-for-react';
import TempData from '@/data/tempdata.json';

const aggregateByMonth = (data, groupBy) => {
  const result = {};
  data.forEach(item => {
    const month = item.Sale_Date.slice(0, 7);
    if (!result[month]) result[month] = {};
    result[month][item[groupBy]] = (result[month][item[groupBy]] || 0) + item.Sales_Amount;
  });
  return result;
};

const StackedAreaChart = () => {
  const regionSalesData = aggregateByMonth(TempData, 'Region');
  const months = [...new Set(TempData.map(item => item.Sale_Date.slice(0, 7)))].sort();

  const regions = ['North', 'South', 'East', 'West'];
  const seriesData = regions.map((region, index) => ({
    name: region,
    type: 'line',
    stack: 'total',
    areaStyle: { color: ['#D3D3D3', '#A9A9A9', '#696969', '#4F4F4F'][index] },
    smooth: true,
    data: months.map(month => regionSalesData[month]?.[region] || 0),
  }));

  const option = {
    title: { text: 'Sales by Region Over Time', left: 'center', textStyle: { color: '#FFFFFF' } },
    tooltip: { trigger: 'axis', textStyle: { color: '#000000' } },
    legend: { data: regions, bottom: 0, textStyle: { color: '#FFFFFF' } },
    xAxis: { type: 'category', data: months, axisLabel: { color: '#FFFFFF' } },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#FFFFFF' },
      splitLine: {
        lineStyle: {
          color: '#444444',
          width: 0.5, // Thickness of horizontal grid lines
        },
      },
    },
    series: seriesData,
    color: ['#D3D3D3', '#A9A9A9', '#696969', '#4F4F4F'],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%', padding: '10px 0 10px 0' }} />;
};

export default StackedAreaChart;