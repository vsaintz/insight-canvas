import React from 'react';
import ReactECharts from 'echarts-for-react';

// Mock JSON data
const data = [
  { "Sale_Date": "2023-01-15", "Region": "North", "Product_Category": "Furniture", "Sales_Amount": 5200.50, "Quantity_Sold": 20 },
  { "Sale_Date": "2023-01-20", "Region": "South", "Product_Category": "Electronics", "Sales_Amount": 3800.75, "Quantity_Sold": 15 },
  { "Sale_Date": "2023-02-10", "Region": "East", "Product_Category": "Clothing", "Sales_Amount": 2500.30, "Quantity_Sold": 25 },
  { "Sale_Date": "2023-02-25", "Region": "West", "Product_Category": "Food", "Sales_Amount": 4300.20, "Quantity_Sold": 18 },
  { "Sale_Date": "2023-03-05", "Region": "North", "Product_Category": "Electronics", "Sales_Amount": 6100.90, "Quantity_Sold": 22 },
  { "Sale_Date": "2023-03-18", "Region": "South", "Product_Category": "Furniture", "Sales_Amount": 4700.60, "Quantity_Sold": 19 },
  { "Sale_Date": "2023-04-12", "Region": "East", "Product_Category": "Food", "Sales_Amount": 3200.45, "Quantity_Sold": 30 },
  { "Sale_Date": "2023-04-28", "Region": "West", "Product_Category": "Clothing", "Sales_Amount": 2900.10, "Quantity_Sold": 27 },
  { "Sale_Date": "2023-05-15", "Region": "North", "Product_Category": "Food", "Sales_Amount": 7700.80, "Quantity_Sold": 24 },
  { "Sale_Date": "2023-05-22", "Region": "South", "Product_Category": "Clothing", "Sales_Amount": 3400.25, "Quantity_Sold": 28 },
  { "Sale_Date": "2023-06-10", "Region": "East", "Product_Category": "Electronics", "Sales_Amount": 4800.70, "Quantity_Sold": 16 },
  { "Sale_Date": "2023-06-25", "Region": "West", "Product_Category": "Furniture", "Sales_Amount": 5100.40, "Quantity_Sold": 21 },
];

// Aggregate data by month and region
const aggregateByMonth = (data, groupBy) => {
  const result = {};
  data.forEach(item => {
    const month = item.Sale_Date.slice(0, 7); // YYYY-MM
    if (!result[month]) result[month] = {};
    result[month][item[groupBy]] = (result[month][item[groupBy]] || 0) + item.Sales_Amount;
  });
  return result;
};

const StackedAreaChart = () => {
  const regionSalesData = aggregateByMonth(data, 'Region');
  const months = [...new Set(data.map(item => item.Sale_Date.slice(0, 7)))].sort();

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
          color: '#444444', // Custom color for horizontal grid lines
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