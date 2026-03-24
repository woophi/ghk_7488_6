declare module 'react-gauge-chart' {
  import type { CSSProperties, FC } from 'react';

  export type GaugeChartProps = {
    id: string;
    style?: CSSProperties;
    className?: string;
    nrOfLevels?: number;
    colors?: string[];
    arcsLength?: number[];
    arcPadding?: number;
    arcWidth?: number;
    cornerRadius?: number;
    percent?: number;
    animate?: boolean;
    hideText?: boolean;
    needleColor?: string;
    needleBaseColor?: string;
    textColor?: string;
    formatTextValue?: (value: string) => string;
  };

  const GaugeChart: FC<GaugeChartProps>;

  export default GaugeChart;
}
