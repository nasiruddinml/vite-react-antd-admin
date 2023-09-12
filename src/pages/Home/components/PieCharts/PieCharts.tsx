import { Pie } from '@ant-design/plots';
import { type PieConfig } from '@ant-design/charts';
import { memo } from 'react';
import { useChartsConfig } from '@/hooks/web/antCharts/useChartsConfig';

const PieChart = memo(() => {
  const { theme } = useChartsConfig();
  const data = [
    {
      type: 'Dhaka',
      value: 27,
    },
    {
      type: 'Barisal',
      value: 25,
    },
    {
      type: 'Bogra',
      value: 18,
    },
    {
      type: 'Chittagong',
      value: 15,
    },
    {
      type: 'Khulna',
      value: 10,
    },
    {
      type: 'Mymensing',
      value: 5,
    },
  ];

  const config: PieConfig = {
    appendPadding: 10,
    data,
    theme,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return <Pie {...config} />;
});

export default PieChart;
