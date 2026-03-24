import { QuestionItem } from '../types';

export const getAnswerTone = (question: QuestionItem, answer: 'yes' | 'no') => {
  return question.activeButton === answer ? 'positive' : 'negative';
};
