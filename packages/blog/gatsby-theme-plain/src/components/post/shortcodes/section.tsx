/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';

const _noop = () => {};

const Section: React.FC<{
  onLoad: () => void;
}> = (props) => {
  const { onLoad = _noop } = props;
  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <p>
      <section {...props} />
    </p>
  );
};

export const section = Section;
