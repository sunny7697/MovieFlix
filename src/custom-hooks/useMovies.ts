import { useState, useEffect } from 'react';
import { getMovies } from '../api/axios';
import { IMovieDetails } from '../common/models';
import { yearAndPageInitialState } from '../App';

const useMovies = (
  yearAndPageState = yearAndPageInitialState,
  isDownScrolled = true,
  setIsDownScrolled: Function,
  genres = ''
) => {
  const [resultsUp, setResultsUp] = useState<any>([]);
  const [resultsDown, setResultsDown] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPageForDown, setHasNextPageForDown] = useState(false);
  // const [hasNextPageForUp, setHasNextPageForUp] = useState(false);

  const pageNum = isDownScrolled
    ? yearAndPageState?.downScroll?.pageNum
    : yearAndPageState?.upScroll?.pageNum;
  const year = isDownScrolled
    ? yearAndPageState?.downScroll?.year
    : yearAndPageState?.upScroll?.year;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getMovies(pageNum, year, genres, { signal })
      .then((data: IMovieDetails[]) => {
        const newData = data.map((item: IMovieDetails) => ({
          ...item,
          year: item.release_date?.substring(0, 4),
        }));
        if (isDownScrolled) {
          setResultsUp((prev: any) => [...new Set([...prev, ...newData])]);
          if (yearAndPageState?.downScroll?.pageNum === 1)
            setIsDownScrolled(false);
        } else {
          setResultsDown((prev: any) => [...new Set([...newData, ...prev])]);
        }
        setHasNextPageForDown(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e: any) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [yearAndPageState, isDownScrolled]);

  return {
    isLoading,
    isError,
    error,
    resultsUp,
    resultsDown,
    hasNextPageForDown,
  };
};

export default useMovies;
