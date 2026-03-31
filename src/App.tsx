import { Button } from '@alfalab/core-components/button/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Radio } from '@alfalab/core-components/radio/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { BankMIcon } from '@alfalab/icons-glyph/BankMIcon';
import { FlameMIcon } from '@alfalab/icons-glyph/FlameMIcon';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { UsdMIcon } from '@alfalab/icons-glyph/UsdMIcon';
import { WorldMIcon } from '@alfalab/icons-glyph/WorldMIcon';
import { type ComponentType, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnswerScreen, inputChips } from './answer/AnswerScreen';
import { QuestionGauge } from './components/QuestionGauge';
import { useStocksData } from './hooks/useStocksData';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import type { QuestionItem } from './types';
import { getAnswerTone } from './utils/tone';

const CATEGORY_ALL = 'Все';

const categoryIcons = {
  [CATEGORY_ALL]: StarMIcon,
  Финансы: UsdMIcon,
  Политика: WorldMIcon,
  Культура: BankMIcon,
} as const;

const getMultiplierText = (value: number) => `x${value.toFixed(2)}`;

const getAnswerText = (answer: 'yes' | 'no') => {
  return answer === 'yes' ? 'Да' : 'Нет';
};

type CategoryPillProps = {
  category: string;
  isActive: boolean;
  onClick: () => void;
};

const answers = [
  {
    id: 1,
    answer: () => 'Ничего, это просто голосование',
  },
  {
    id: 2,
    answer: (sum: number) => `Потеряю поставленные ${sum} ₽ кешбэка`,
  },
  {
    id: 3,
    answer: (sum: number) => `Спишут ${sum} ₽ с карты`,
  },
  {
    id: 4,
    answer: () => 'Затрудняюсь ответить',
  },
];

const CategoryPill = ({ category, isActive, onClick }: CategoryPillProps) => {
  const Icon = categoryIcons[category as keyof typeof categoryIcons] ?? StarMIcon;

  return (
    <button className={isActive ? appSt.filterButtonActive : appSt.filterButton} type="button" onClick={onClick}>
      <Icon className={isActive ? appSt.filterIconActive : appSt.filterIcon} />
      <Typography.Text tag="span" view="primary-small" color={isActive ? 'primary-inverted' : 'secondary'}>
        {category}
      </Typography.Text>
    </button>
  );
};

type AnswerButtonProps = {
  question: QuestionItem;
  answer: 'yes' | 'no';
  setAnswerData: React.Dispatch<React.SetStateAction<{ question: QuestionItem; answer: 'yes' | 'no' } | null>>;
};

const AnswerButton = ({ question, answer, setAnswerData }: AnswerButtonProps) => {
  const tone = getAnswerTone(question, answer);
  const multiplier = answer === 'yes' ? question.yesX : question.noX;
  const isOnFire = question.onFire === answer;

  return (
    <button
      className={tone === 'positive' ? appSt.answerButtonPositive : appSt.answerButtonNegative}
      type="button"
      onClick={() => {
        window.gtag('event', '7488_answer_click', { question: question.question, answer, var: 'var6' });
        setAnswerData({ question, answer });
      }}
    >
      <Typography.Text tag="span" view="primary-medium" weight="bold" color={tone === 'positive' ? 'positive' : 'negative'}>
        {getAnswerText(answer)}
      </Typography.Text>

      <span className={tone === 'positive' ? appSt.multiplierPositive : appSt.multiplierNegative}>
        <Typography.Text
          tag="span"
          view="secondary-small"
          weight="bold"
          color={tone === 'positive' ? 'positive' : 'negative'}
        >
          {getMultiplierText(multiplier)}
        </Typography.Text>
        {isOnFire ? <FlameMIcon className={appSt.fireIcon} /> : null}
      </span>
    </button>
  );
};

const QuestionCard = ({
  question,
  index,
  GaugeChartComponent,
  setAnswerData,
}: {
  question: QuestionItem;
  index: number;
  GaugeChartComponent: ComponentType<Record<string, unknown>> | null;
  setAnswerData: React.Dispatch<React.SetStateAction<{ question: QuestionItem; answer: 'yes' | 'no' } | null>>;
}) => {
  const Icon = categoryIcons[question.category as keyof typeof categoryIcons] ?? StarMIcon;

  return (
    <article className={appSt.card}>
      <div className={appSt.cardHead}>
        <div className={appSt.categoryTag}>
          <Icon className={appSt.categoryTagIcon} />
          <Typography.Text tag="span" view="secondary-small" weight="medium">
            {question.category}
          </Typography.Text>
        </div>

        <div className={appSt.questionRow}>
          <Typography.Text tag="div" view="primary-medium" weight="medium" className={appSt.questionTitle}>
            {question.question}
          </Typography.Text>

          <QuestionGauge
            id={`gauge-${index}`}
            percentage={question.graphData.percentage}
            type={question.graphData.type}
            GaugeChartComponent={GaugeChartComponent}
          />
        </div>
      </div>

      <div className={appSt.answersRow}>
        <AnswerButton question={question} answer="yes" setAnswerData={setAnswerData} />
        <AnswerButton question={question} answer="no" setAnswerData={setAnswerData} />
      </div>
    </article>
  );
};

export const App = () => {
  const { questions } = useStocksData();
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const [view, setView] = useState<'final' | 'answer'>('answer');
  const [GaugeChartComponent, setGaugeChartComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [answerData, setAnswerData] = useState<{
    question: QuestionItem;
    answer: 'yes' | 'no';
  } | null>(null);
  const [finalAnswer, setFinalAnswer] = useState<string>('');
  const [sum, setSum] = useState(inputChips[0]);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
    window.gtag('event', '7488_selection_impression', { var: 'var6' });
  }, []);

  useEffect(() => {
    if (view === 'final') {
      window.gtag('event', '7488_quiz_impression', { var: 'var6' });
    }
  }, [view]);

  useEffect(() => {
    let isMounted = true;

    import('react-gauge-chart')
      .then(module => {
        const candidate =
          typeof module === 'function'
            ? module
            : typeof module.default === 'function'
              ? module.default
              : typeof (module.default as { default?: unknown } | undefined)?.default === 'function'
                ? (module.default as unknown as { default: ComponentType<Record<string, unknown>> }).default
                : null;

        if (!candidate) {
          console.error('GaugeChart module has unsupported shape', module);
          return;
        }

        if (isMounted) {
          setGaugeChartComponent(() => candidate as ComponentType<Record<string, unknown>>);
        }
      })
      .catch(error => {
        console.error('Failed to load react-gauge-chart', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [CATEGORY_ALL, ...new Set(questions.map(({ category }) => category))];
  const filteredQuestions =
    activeCategory === CATEGORY_ALL ? questions : questions.filter(({ category }) => category === activeCategory);

  const submit = () => {
    window.gtag('event', '7488_continue_click', { var: 'var6', answer: finalAnswer });
    window.location.replace(
      'alfabank://sdui_screen?screenName=InvestmentLongread&fromCurrent=true&shouldUseBottomSafeArea=true&endpoint=v1/invest-main-screen-view/investment-longread/98955%3flocation=AM%26campaignCode=GH',
    );
  };

  if (view === 'final') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.Title tag="h1" view="medium" weight="semibold" font="system" style={{ marginTop: '1rem' }}>
            Как вы поняли — что будет с вашим кешбеком, если не угадаете?
          </Typography.Title>

          {answers.map(dataAnswer => (
            <PureCell
              onClick={() => {
                setFinalAnswer(dataAnswer.answer(sum));
              }}
              className={appSt.cellAnswer}
            >
              <PureCell.Content>
                <PureCell.Main>
                  <Typography.Text view="primary-medium">{dataAnswer.answer(sum)}</Typography.Text>
                </PureCell.Main>
              </PureCell.Content>
              <PureCell.Addon verticalAlign="center">
                <Radio
                  checked={finalAnswer === dataAnswer.answer(sum)}
                  onChange={() => setFinalAnswer(dataAnswer.answer(sum))}
                />
              </PureCell.Addon>
            </PureCell>
          ))}
        </div>
        <div className={appSt.bottomBtn}>
          <Button onClick={submit} type="button" block view="primary" disabled={!finalAnswer}>
            Продолжить
          </Button>
        </div>
      </>
    );
  }

  if (answerData) {
    return (
      <AnswerScreen
        question={answerData.question}
        answer={answerData.answer}
        GaugeChartComponent={GaugeChartComponent}
        onBack={() => setAnswerData(null)}
        setAnswerData={setAnswerData}
        setView={setView}
        setSum={setSum}
        sum={sum}
      />
    );
  }

  return (
    <div className={appSt.page}>
      <div className={appSt.hero}>
        <Typography.Text tag="div" className={appSt.heroTitle}>
          Используй свой кешбэк
        </Typography.Text>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false} className={appSt.heroText}>
          Ставь кешбэк на реальные события. Угадал — получаешь больше баллов.
        </Typography.Text>
      </div>

      <section className={appSt.feedSection}>
        <div className={appSt.filtersWrap}>
          <Swiper slidesPerView="auto" spaceBetween={8}>
            {categories.map(category => (
              <SwiperSlide key={category} className={appSt.filterSlide}>
                <CategoryPill
                  category={category}
                  isActive={category === activeCategory}
                  onClick={() => setActiveCategory(category)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={appSt.cardsList}>
          {filteredQuestions.map((question, index) => (
            <QuestionCard
              key={`${question.category}-${question.question}`}
              question={question}
              index={index}
              GaugeChartComponent={GaugeChartComponent}
              setAnswerData={setAnswerData}
            />
          ))}

          {filteredQuestions.length === 0 ? (
            <div className={appSt.emptyState}>
              <Typography.Text tag="p" view="primary-medium" defaultMargins={false} color="secondary">
                Загружаем вопросы...
              </Typography.Text>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};
