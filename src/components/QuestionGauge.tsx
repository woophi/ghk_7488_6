import { Typography } from '@alfalab/core-components/typography/cssm';
import { Component, type ComponentType, type ErrorInfo, type ReactNode } from 'react';
import { appSt } from '../style.css';

type QuestionGaugeProps = {
  id: string;
  percentage: number;
  type: 'yes' | 'no';
  GaugeChartComponent: ComponentType<Record<string, unknown>> | null;
};

type GaugeBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type GaugeBoundaryState = {
  hasError: boolean;
};

class GaugeErrorBoundary extends Component<GaugeBoundaryProps, GaugeBoundaryState> {
  public state: GaugeBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('GaugeChart runtime error', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const GaugeFallback = ({ percentage }: Pick<QuestionGaugeProps, 'percentage'>) => {
  const radius = 28;
  const circumference = Math.PI * radius;
  const progressOffset = circumference * (1 - percentage / 100);

  return (
    <svg viewBox="0 0 72 52" className={appSt.gaugeSvgFallback} aria-hidden>
      <path d="M8 44a28 28 0 0 1 56 0" className={appSt.gaugeTrackFallback} />
      <path
        d="M8 44a28 28 0 0 1 56 0"
        className={appSt.gaugeProgressFallback}
        style={{ strokeDasharray: circumference, strokeDashoffset: progressOffset }}
      />
    </svg>
  );
};

const getAnswerText = (answer: 'yes' | 'no') => {
  return answer === 'yes' ? 'Да' : 'Нет';
};

export const QuestionGauge = ({ id, percentage, type, GaugeChartComponent }: QuestionGaugeProps) => {
  return (
    <div className={appSt.gaugeWrap}>
      {GaugeChartComponent ? (
        <GaugeErrorBoundary fallback={<GaugeFallback percentage={percentage} />}>
          <GaugeChartComponent
            id={id}
            nrOfLevels={2}
            arcsLength={[percentage / 100, 1 - percentage / 100]}
            colors={['#32C86E', '#E2E4EC']}
            percent={percentage / 100}
            arcWidth={0.22}
            cornerRadius={0}
            needleColor="transparent"
            needleBaseColor="transparent"
            hideText
            animate={false}
            style={{ width: '100%', height: '100%' }}
          />
        </GaugeErrorBoundary>
      ) : (
        <GaugeFallback percentage={percentage} />
      )}

      <div className={appSt.gaugeValue}>{percentage}%</div>
      <Typography.Text tag="span" view="secondary-small" color="secondary" className={appSt.gaugeLabel}>
        {getAnswerText(type).toLowerCase()}
      </Typography.Text>
    </div>
  );
};
