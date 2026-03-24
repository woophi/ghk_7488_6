import { useEffect, useState } from 'react';

import { GistResponse, QuestionItem } from '../types';

export const useStocksData = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gist.githubusercontent.com/nsdooris/ad8b0340e2fe4e03790e05ef57470d21/raw/');
      const data = (await response.json()) as GistResponse;
      setQuestions(data.questions);

      setLoading(false);
    };

    fetchData();
  }, []);

  return { questions, loading };
};
