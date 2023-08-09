import React, { Suspense } from 'react';
import { Loading } from '@app/components/common/Loading/Loading';

type ReturnType<T> = (props: T) => React.JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-types
export const withLoading = <T extends object>(Component: React.ComponentType<T>): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
