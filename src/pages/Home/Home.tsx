import { useRef, useCallback } from 'react';

import { IMovieDetails } from '../../common/models';
import { ListRenderer } from '../../components';
import MovieListItem, {
  IMovieListItemProps,
} from './components/MovieListItem/MovieListItem';
import { IYearAndPageState } from '../../App';
import './styles';

export interface IHomeProps {
  resultsUp: IMovieDetails[];
  resultsDown: IMovieDetails[];
  isLoading: boolean;
  hasNextPageForDown?: boolean;
  setYearAndPageState: Function;
  setIsDownScrolled: Function;
}

const Home = ({
  resultsUp,
  resultsDown,
  isLoading,
  hasNextPageForDown,
  setYearAndPageState,
  setIsDownScrolled,
}: IHomeProps) => {
  const intObserver = useRef<any>(null);
  const intObserverUp = useRef<any>(null);
  const yoyoRef = useRef<any>(null);
  const firstPostRef = useCallback(
    (movie: IMovieDetails) => {
      if (isLoading) return;
      if (intObserverUp.current) intObserverUp.current?.disconnect();

      intObserverUp.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasNextPageForDown &&
            window.screenY === 0
          ) {
            // window.scrollBy({ top: 3000, behavior: 'auto' });
            // window.screenY = 1000;
            console.log('near the first movie: ', window.screenY);
            setIsDownScrolled(false);
            setYearAndPageState((prev: IYearAndPageState) => ({
              ...prev,
              upScroll: {
                ...prev.upScroll,
                pageNum: prev.upScroll.pageNum + 1,
              },
            }));

            // const selectedItem = yoyoRef.current?.childNodes[19];
            // selectedItem?.scrollIntoView({
            //   block: 'nearest',
            //   inline: 'nearest',
            // });
          }
        },
        { threshold: 1.0 }
      );

      if (movie) intObserverUp.current.observe(movie);
    },
    [isLoading, hasNextPageForDown]
  );
  const lastPostRef = useCallback(
    (movie: IMovieDetails) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPageForDown) {
          console.log('near the last movie');
          setIsDownScrolled(true);
          setYearAndPageState((prev: IYearAndPageState) => ({
            ...prev,
            downScroll: {
              ...prev.downScroll,
              pageNum: prev.downScroll.pageNum + 1,
            },
          }));
        }
      });

      if (movie) intObserver.current.observe(movie);
    },
    [setYearAndPageState, isLoading, hasNextPageForDown]
  );

  return (
    <div className='home'>
      {isLoading && <div>Loading...</div>}
      <ListRenderer
        data={resultsDown}
        renderer={(props: IMovieListItemProps, i: number) => {
          if (i === 0)
            return (
              <MovieListItem
                ref={firstPostRef}
                movie={{ ...props }}
                key={props.id}
              />
            );
          return (
            <MovieListItem movie={{ ...props }} key={props.id} index={i} />
          );
        }}
        bucketKey='year'
        ref={yoyoRef}
        classname='list-renderer-1'
      />
      <ListRenderer
        data={resultsUp}
        renderer={(props: IMovieListItemProps, i: number) => {
          if (resultsUp?.length === i + 1) {
            return (
              <MovieListItem
                ref={lastPostRef}
                movie={{ ...props }}
                key={props.id}
              />
            );
          }
          return (
            <MovieListItem movie={{ ...props }} key={props.id} index={i} />
          );
        }}
        bucketKey='year'
        classname='list-renderer-1'
      />
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Home;
