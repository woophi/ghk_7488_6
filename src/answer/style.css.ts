import { style } from '@vanilla-extract/css';

const page = style({
  minHeight: '100vh',
  maxWidth: '420px',
  margin: '0 auto',
  backgroundColor: '#F6F6FD',
  paddingBottom: '92px',
});

const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '12px 12px 0',
});

const topCard = style({
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  padding: '14px 14px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const topMeta = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
});

const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '13px',
  minHeight: '26px',
  padding: '3px 10px',
  backgroundColor: '#F2F3F5',
});

const chipIcon = style({
  width: '14px',
  height: '14px',
  color: 'rgba(3, 3, 6, 0.75)',
});

const questionTitle = style({
  fontSize: '46px',
  lineHeight: '54px',
  fontWeight: 700,
  letterSpacing: '-0.2px',
  color: '#181718',
});

const sectionCard = style({
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  padding: '16px 12px 12px',
});

const sectionTitle = style({
  color: '#1D1E24',
  marginBottom: '12px',
});

const chooseRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
});

const chooseButton = style({
  borderRadius: '16px',
  minHeight: '74px',
  border: '1px solid #CDCED5',
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const chooseButtonActive = style({
  borderRadius: '16px',
  minHeight: '74px',
  border: '1px solid #212124',
  backgroundColor: '#212124',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const coeffText = style({
  marginTop: '2px',
});

const eventRow = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
});

const eventText = style({
  flex: 1,
  color: 'rgba(6, 7, 12, 0.62)',
});

const calcRows = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const calcRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'center',
});

const calcLabel = style({
  color: 'rgba(27, 28, 34, 0.62)',
});

const calcValue = style({
  color: '#2A2B30',
  textAlign: 'right',
});

const calcDivider = style({
  margin: '10px 0',
  borderBottom: '1px solid #D8DAE1',
});

const resultRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

const bottomBar = style({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: 0,
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  gap: '8px',
  padding: '12px',
  backgroundColor: '#F6F6FD',
});

const backButton = style({
  width: '56px',
  minWidth: '56px',
  height: '56px',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

const backIcon = style({
  width: '18px',
  height: '18px',
  color: '#1B1C22',
});

const actionButton = style({
  borderRadius: '12px',
});

export const answerSt = {
  page,
  content,
  topCard,
  topMeta,
  chip,
  chipIcon,
  questionTitle,
  sectionCard,
  sectionTitle,
  chooseRow,
  chooseButton,
  chooseButtonActive,
  coeffText,
  eventRow,
  eventText,
  calcRows,
  calcRow,
  calcLabel,
  calcValue,
  calcDivider,
  resultRow,
  bottomBar,
  backButton,
  backIcon,
  actionButton,
};
