export type QuestionItem = {
  question: string;
  category: string;
  description: string;
  voters: number;
  yesX: number;
  noX: number;
  activeButton: 'yes' | 'no';
  onFire: 'yes' | 'no' | 'none';
  graphData: {
    percentage: number;
    type: 'yes' | 'no';
    img: string;
  };
};

export type GistResponse = {
  questions: QuestionItem[];
};
