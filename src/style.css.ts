import { globalStyle, style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const box = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '1rem',
  backgroundColor: '#F3F4F5',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const switchItem = style({});

const page = style({
  minHeight: '100vh',
  maxWidth: '420px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
});

const hero = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  padding: '24px 20px 20px',
});

const heroTitle = style({
  maxWidth: '290px',
  fontSize: '34px',
  lineHeight: '40px',
  fontWeight: 600,
  letterSpacing: '0.37px',
  color: '#0C0C0F',
});

const heroText = style({
  maxWidth: '320px',
  color: 'rgba(3, 3, 6, 0.88)',
});

const feedSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px 0 28px',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  backgroundColor: '#F6F6FD',
  minHeight: 'calc(100vh - 152px)',
});

const filtersWrap = style({
  padding: '0 16px',
});

const filterSlide = style({
  width: 'auto',
});

const filterButtonBase = {
  height: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  borderRadius: '8px',
  padding: '0 12px',
  border: '1px solid #D5D6DC',
  backgroundColor: 'transparent',
  appearance: 'none' as const,
  cursor: 'pointer',
};

const filterButton = style(filterButtonBase);

const filterButtonActive = style({
  ...filterButtonBase,
  borderColor: '#212124',
  backgroundColor: '#212124',
});

const filterIcon = style({
  width: '16px',
  height: '16px',
  color: 'rgba(4, 4, 19, 0.55)',
  flexShrink: 0,
});

const filterIconActive = style({
  width: '16px',
  height: '16px',
  color: 'rgba(255, 255, 255, 0.94)',
  flexShrink: 0,
});

const cardsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 16px',
});

const card = style({
  overflow: 'hidden',
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 0 rgba(14, 16, 20, 0.04)',
});

const cardHead = style({
  padding: '16px 20px 12px',
});

const categoryTag = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  minHeight: '26px',
  padding: '3px 8px 3px 4px',
  borderRadius: '13px',
  backgroundColor: '#F2F3F5',
});

const categoryTagIcon = style({
  width: '16px',
  height: '16px',
  color: '#2B2D33',
  flexShrink: 0,
});

const questionRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '12px',
});

const questionTitle = style({
  flex: 1,
  minWidth: 0,
  color: 'rgba(3, 3, 6, 0.88)',
});

const gaugeWrap = style({
  position: 'relative',
  width: '72px',
  height: '52px',
  flexShrink: 0,
});

const gaugeValue = style({
  position: 'absolute',
  top: '13px',
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: '13px',
  lineHeight: '18px',
  fontWeight: 700,
  color: '#181718',
});

const gaugeLabel = style({
  position: 'absolute',
  top: '29px',
  left: 0,
  right: 0,
  textAlign: 'center',
});

const gaugeSvgFallback = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
});

const gaugeTrackFallback = style({
  fill: 'none',
  stroke: '#E2E4EC',
  strokeWidth: 8,
  strokeLinecap: 'butt',
});

const gaugeProgressFallback = style({
  fill: 'none',
  stroke: '#32C86E',
  strokeWidth: 8,
  strokeLinecap: 'butt',
  transformOrigin: '50% 100%',
});

const answersRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  padding: '12px 20px 20px',
});

const answerButtonBase = {
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#F2F3F5',
  appearance: 'none' as const,
  cursor: 'pointer',
};

const answerButtonPositive = style(answerButtonBase);

const answerButtonNegative = style(answerButtonBase);

const multiplierBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  minHeight: '20px',
  padding: '2px 8px',
  borderRadius: '8px',
  whiteSpace: 'nowrap' as const,
};

const multiplierPositive = style({
  ...multiplierBase,
  backgroundColor: '#E6F8F2',
});

const multiplierNegative = style({
  ...multiplierBase,
  backgroundColor: '#FFE4E8',
});

const fireIcon = style({
  width: '12px',
  height: '12px',
  color: '#FF6B00',
  flexShrink: 0,
});

const emptyState = style({
  padding: '24px 20px',
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
});

globalStyle(`${switchItem} > span > span:first-child`, {
  fontWeight: 500,
});

globalStyle(`${gaugeWrap} svg`, {
  overflow: 'visible',
});

globalStyle(`${gaugeWrap} > div`, {
  width: '100% !important',
  height: '100% !important',
});

globalStyle(`${gaugeWrap} path`, {
  strokeLinecap: 'butt',
});

export const appSt = {
  bottomBtn,
  container,
  box,
  row,
  switchItem,
  page,
  hero,
  heroTitle,
  heroText,
  feedSection,
  filtersWrap,
  filterSlide,
  filterButton,
  filterButtonActive,
  filterIcon,
  filterIconActive,
  cardsList,
  card,
  cardHead,
  categoryTag,
  categoryTagIcon,
  questionRow,
  questionTitle,
  gaugeWrap,
  gaugeValue,
  gaugeLabel,
  gaugeSvgFallback,
  gaugeTrackFallback,
  gaugeProgressFallback,
  answersRow,
  answerButtonPositive,
  answerButtonNegative,
  multiplierPositive,
  multiplierNegative,
  fireIcon,
  emptyState,
};
