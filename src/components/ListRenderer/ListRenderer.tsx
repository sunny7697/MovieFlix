import React, { useState, useEffect, Fragment } from 'react';
import './ListRenderer.css';
import { IMovieDetails, StringKeyObject } from '../../common/models';

interface IListRendererProps {
  data: IMovieDetails[];
  renderer: Function;
  bucketKey?: string;
  classname?: string;
}

const ListRenderer = React.forwardRef(
  (
    { data, renderer, bucketKey = '', classname = '' }: IListRendererProps,
    ref: any
  ) => {
    const [listData, setListData] = useState<StringKeyObject>(null);

    const content = Object.keys(listData || {})?.map((key) => {
      return (
        <Fragment key={key}>
          {bucketKey && <div className='list-renderer-key'>{key}</div>}

          <ul className='list-items' ref={ref}>
            {listData?.[key]?.map((item: IMovieDetails, i: number) =>
              renderer(item, i)
            )}
          </ul>
        </Fragment>
      );
    });

    useEffect(() => {
      let newData = {};
      if (bucketKey) {
        newData = data.reduce((acc: StringKeyObject, curr: IMovieDetails) => {
          const key = curr[bucketKey];
          return {
            ...acc,
            [key]: [...(acc?.[key] || []), curr],
          };
        }, {});
      } else {
        newData = { list: data };
      }
      setListData(newData);
    }, [data]);

    return <div className={`list-renderer ${classname}`}>{content}</div>;
  }
);

export default ListRenderer;
