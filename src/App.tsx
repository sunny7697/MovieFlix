import { useState } from 'react';

import useMovies from './custom-hooks/useMovies';
import Home from './pages/Home';
import './App.css';

export interface IYearAndPageState {
  upScroll: {
    pageNum: number;
    year: string;
  };
  downScroll: {
    pageNum: number;
    year: string;
  };
}

export const yearAndPageInitialState = {
  upScroll: { pageNum: 1, year: '2011' },
  downScroll: { pageNum: 1, year: '2012' },
};

function App() {
  const [yearAndPageState, setYearAndPageState] = useState<IYearAndPageState>(
    yearAndPageInitialState
  );
  const [isDownScrolled, setIsDownScrolled] = useState(true);
  const { resultsUp, resultsDown, isLoading, hasNextPageForDown } = useMovies(
    yearAndPageState,
    isDownScrolled,
    setIsDownScrolled,
    ''
  );

  return (
    <Home
      resultsUp={resultsUp}
      resultsDown={resultsDown}
      isLoading={isLoading}
      hasNextPageForDown={hasNextPageForDown}
      setYearAndPageState={setYearAndPageState}
      setIsDownScrolled={setIsDownScrolled}
    />
  );
}

export default App;
