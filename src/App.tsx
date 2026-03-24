import { Typography } from '@alfalab/core-components/typography/cssm';
import { BankMIcon } from '@alfalab/icons-glyph/BankMIcon';
import { FlameMIcon } from '@alfalab/icons-glyph/FlameMIcon';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { UsdMIcon } from '@alfalab/icons-glyph/UsdMIcon';
import { WorldMIcon } from '@alfalab/icons-glyph/WorldMIcon';
import { type ComponentType, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnswerScreen } from './answer/AnswerScreen';
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
      onClick={() => setAnswerData({ question, answer })}
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
  const [GaugeChartComponent, setGaugeChartComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [answerData, setAnswerData] = useState<{
    question: QuestionItem;
    answer: 'yes' | 'no';
  } | null>(null);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

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

  if (answerData) {
    return (
      <AnswerScreen
        question={answerData.question}
        answer={answerData.answer}
        GaugeChartComponent={GaugeChartComponent}
        onBack={() => setAnswerData(null)}
        setAnswerData={setAnswerData}
      />
    );
  }

  return (
    <div className={appSt.page}>
      <div className={appSt.hero}>
        <Typography.Text tag="div" className={appSt.heroTitle}>
          Используй свой кэшбэк
        </Typography.Text>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false} className={appSt.heroText}>
          Ставь рубли кэшбека на реальные события. Угадал — получаешь больше баллов.
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
